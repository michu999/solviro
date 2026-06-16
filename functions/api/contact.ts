/**
 * Contact Form Handler for Cloudflare Pages Functions
 * Uses Resend API to send emails to Google Workspace Gmail
 *
 * IMPORTANT: Domain solviro.pl must be verified in resend.com dashboard
 * Add RESEND_API_KEY to Cloudflare Pages environment variables
 */

interface ContactFormData {
  email: string;
  phone: string;
  service?: string;
  gdpr?: string;
}

interface Env {
  RESEND_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.email || !data.phone || !data.gdpr) {
      return new Response(
        JSON.stringify({ error: 'Brakuje wymaganych pól' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Map service values to Polish labels
    const serviceLabels: Record<string, string> = {
      'restrukturyzacja': 'Restrukturyzacja',
      'upadlosc': 'Upadłość',
      'inne': 'Inne usługi'
    };

    const serviceName = data.service ? serviceLabels[data.service] || data.service : 'Nie wybrano';

    const emailBody = `
Nowe zapytanie z formularza Solviro Legal
==========================================

Usługa: ${serviceName}
Email: ${data.email}
Telefon: ${data.phone}

---
Zgoda RODO: Tak
Data: ${new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' })}
    `.trim();

    // Send email via Resend API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Formularz Solviro <formularz@solviro.pl>',
        to: 'biuro@solviro.pl',
        subject: `Nowe zapytanie — ${serviceName}`,
        text: emailBody
      })
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.text();
      console.error('Resend API error:', errorData);
      return new Response(
        JSON.stringify({ error: 'Błąd wysyłania wiadomości' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({ ok: true }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'Wystąpił błąd serwera' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

