const DEFAULT_PAGE_NUMBER = 1
const DEFAULT_PAGE_LIMIT = 20

function processQueryParams(query) {
  const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER;
  let limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT;
  if (limit > 100) limit = DEFAULT_PAGE_LIMIT
  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
    search: query.search
  }
}

module.exports = {
  processQueryParams
}