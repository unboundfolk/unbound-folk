export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const HomepagePartsFragmentDoc = gql`
    fragment HomepageParts on Homepage {
  __typename
  hero {
    __typename
    badge
    headline
    headlineAccent
    subtitle
    ctaPrimary
    ctaSecondary
  }
  problem {
    __typename
    headline
    subtitle
    cards {
      __typename
      label
      title
      copy
    }
  }
  pillarsEyebrow
  pillarsTitle
  pillarsCreativeTitle
  pillarsCreativeDescription
  pillarsCreativeServices
  pillarsCreativeImage
  pillarsCreativeHref
  pillarsSystemsTitle
  pillarsSystemsDescription
  pillarsSystemsServices
  pillarsSystemsImage
  pillarsSystemsHref
  why {
    __typename
    title
    subtitle
    points
  }
  process {
    __typename
    title
    steps {
      __typename
      num
      title
      copy
    }
  }
  cta {
    __typename
    title
    copy
    button
  }
}
    `;
export const CreativePagePartsFragmentDoc = gql`
    fragment CreativePageParts on CreativePage {
  __typename
  hero {
    __typename
    eyebrow
    title
    copy
    image
    cta
  }
  featuresEyebrow
  featuresTitle
  features {
    __typename
    title
    copy
  }
  scopeEyebrow
  scopeTitle
  scopeCopy
  ctaTitle
  ctaCta
  extraFaqs {
    __typename
    question
    answer
    order
  }
}
    `;
export const SystemsPagePartsFragmentDoc = gql`
    fragment SystemsPageParts on SystemsPage {
  __typename
  hero {
    __typename
    eyebrow
    title
    copy
    image
    cta
  }
  featuresEyebrow
  featuresTitle
  features {
    __typename
    title
    copy
  }
  useCasesEyebrow
  useCasesTitle
  useCases
  ctaTitle
  ctaCta
  extraFaqs {
    __typename
    question
    answer
    order
  }
}
    `;
export const AboutPagePartsFragmentDoc = gql`
    fragment AboutPageParts on AboutPage {
  __typename
  hero {
    __typename
    eyebrow
    title
    copy
    image
    cta
  }
  beliefEyebrow
  beliefTitle
  beliefs {
    __typename
    title
    copy
  }
}
    `;
export const GlobalPartsFragmentDoc = gql`
    fragment GlobalParts on Global {
  __typename
  footer {
    __typename
    tagline
    email
    phone
    location
  }
}
    `;
export const WorkPartsFragmentDoc = gql`
    fragment WorkParts on Work {
  __typename
  title
  category
  tags
  image
  problem
  solution
  outcome
  order
}
    `;
export const FaqPartsFragmentDoc = gql`
    fragment FaqParts on Faq {
  __typename
  question
  answer
  order
}
    `;
export const HomepageDocument = gql`
    query homepage($relativePath: String!) {
  homepage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...HomepageParts
  }
}
    ${HomepagePartsFragmentDoc}`;
export const HomepageConnectionDocument = gql`
    query homepageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HomepageFilter) {
  homepageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...HomepageParts
      }
    }
  }
}
    ${HomepagePartsFragmentDoc}`;
export const CreativePageDocument = gql`
    query creativePage($relativePath: String!) {
  creativePage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...CreativePageParts
  }
}
    ${CreativePagePartsFragmentDoc}`;
export const CreativePageConnectionDocument = gql`
    query creativePageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: CreativePageFilter) {
  creativePageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...CreativePageParts
      }
    }
  }
}
    ${CreativePagePartsFragmentDoc}`;
export const SystemsPageDocument = gql`
    query systemsPage($relativePath: String!) {
  systemsPage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...SystemsPageParts
  }
}
    ${SystemsPagePartsFragmentDoc}`;
export const SystemsPageConnectionDocument = gql`
    query systemsPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SystemsPageFilter) {
  systemsPageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...SystemsPageParts
      }
    }
  }
}
    ${SystemsPagePartsFragmentDoc}`;
export const AboutPageDocument = gql`
    query aboutPage($relativePath: String!) {
  aboutPage(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...AboutPageParts
  }
}
    ${AboutPagePartsFragmentDoc}`;
export const AboutPageConnectionDocument = gql`
    query aboutPageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: AboutPageFilter) {
  aboutPageConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...AboutPageParts
      }
    }
  }
}
    ${AboutPagePartsFragmentDoc}`;
export const GlobalDocument = gql`
    query global($relativePath: String!) {
  global(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...GlobalParts
  }
}
    ${GlobalPartsFragmentDoc}`;
export const GlobalConnectionDocument = gql`
    query globalConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: GlobalFilter) {
  globalConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...GlobalParts
      }
    }
  }
}
    ${GlobalPartsFragmentDoc}`;
export const WorkDocument = gql`
    query work($relativePath: String!) {
  work(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...WorkParts
  }
}
    ${WorkPartsFragmentDoc}`;
export const WorkConnectionDocument = gql`
    query workConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: WorkFilter) {
  workConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...WorkParts
      }
    }
  }
}
    ${WorkPartsFragmentDoc}`;
export const FaqDocument = gql`
    query faq($relativePath: String!) {
  faq(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...FaqParts
  }
}
    ${FaqPartsFragmentDoc}`;
export const FaqConnectionDocument = gql`
    query faqConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: FaqFilter) {
  faqConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...FaqParts
      }
    }
  }
}
    ${FaqPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    homepage(variables, options) {
      return requester(HomepageDocument, variables, options);
    },
    homepageConnection(variables, options) {
      return requester(HomepageConnectionDocument, variables, options);
    },
    creativePage(variables, options) {
      return requester(CreativePageDocument, variables, options);
    },
    creativePageConnection(variables, options) {
      return requester(CreativePageConnectionDocument, variables, options);
    },
    systemsPage(variables, options) {
      return requester(SystemsPageDocument, variables, options);
    },
    systemsPageConnection(variables, options) {
      return requester(SystemsPageConnectionDocument, variables, options);
    },
    aboutPage(variables, options) {
      return requester(AboutPageDocument, variables, options);
    },
    aboutPageConnection(variables, options) {
      return requester(AboutPageConnectionDocument, variables, options);
    },
    global(variables, options) {
      return requester(GlobalDocument, variables, options);
    },
    globalConnection(variables, options) {
      return requester(GlobalConnectionDocument, variables, options);
    },
    work(variables, options) {
      return requester(WorkDocument, variables, options);
    },
    workConnection(variables, options) {
      return requester(WorkConnectionDocument, variables, options);
    },
    faq(variables, options) {
      return requester(FaqDocument, variables, options);
    },
    faqConnection(variables, options) {
      return requester(FaqConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
