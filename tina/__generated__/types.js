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
  cta {
    __typename
    title
    copy
    button
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
      url: "https://content.tinajs.io/2.4/content/3c766213-b1a1-4b9b-814d-37d2acb5f95f/github/main",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
