// CaseStudy interface matching Sanity schema from CLAUDE.md
export interface CaseStudy {
  title: string;
  slug: string;
  industry: string;
  challenge: string;
  solution: string;
  result: string;
  publishedAt: string;
}

// Mock data - structured to match future Sanity response
const mockCaseStudies: CaseStudy[] = [
  {
    title: 'Restrukturyzacja firmy produkcyjnej z branży metalowej',
    slug: 'restrukturyzacja-firma-produkcyjna-metal',
    industry: 'Branża produkcyjna',
    challenge: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    solution: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    result: 'Redukcja długu o 65%',
    publishedAt: '2024-03-15',
  },
  {
    title: 'Układ z wierzycielami dla firmy budowlanej',
    slug: 'uklad-wierzyciele-firma-budowlana',
    industry: 'Branża budowlana',
    challenge: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    solution: 'Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.',
    result: 'Układ zatwierdzony w 4 miesiące',
    publishedAt: '2024-02-20',
  },
  {
    title: 'Upadłość konsumencka przedsiębiorcy z sektora handlowego',
    slug: 'upadlosc-konsumencka-handel',
    industry: 'Handel detaliczny',
    challenge: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.',
    solution: 'Praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
    result: 'Pełne oddłużenie',
    publishedAt: '2024-01-10',
  },
];

/**
 * Get all case studies
 * Currently returns mock data - swap to Sanity client for production:
 *
 * import { createClient } from '@sanity/client';
 * const client = createClient({ projectId, dataset, apiVersion });
 * return client.fetch<CaseStudy[]>('*[_type == "caseStudy"] | order(publishedAt desc)');
 */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  // TODO: Replace with Sanity client fetch
  return mockCaseStudies;
}

/**
 * Get a single case study by slug
 * Currently returns mock data - swap to Sanity client for production:
 *
 * return client.fetch<CaseStudy>('*[_type == "caseStudy" && slug.current == $slug][0]', { slug });
 */
export async function getCaseStudy(slug: string): Promise<CaseStudy | undefined> {
  // TODO: Replace with Sanity client fetch
  return mockCaseStudies.find((cs) => cs.slug === slug);
}

/**
 * Get all case study slugs for static path generation
 */
export async function getCaseStudySlugs(): Promise<string[]> {
  const caseStudies = await getCaseStudies();
  return caseStudies.map((cs) => cs.slug);
}

