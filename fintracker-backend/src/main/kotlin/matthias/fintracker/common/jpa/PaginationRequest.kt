package matthias.fintracker.common.jpa

import org.springframework.data.domain.PageRequest.of
import org.springframework.data.domain.Pageable

private const val DEFAULT_PAGE = 0
private const val DEFAULT_PAGE_SIZE = 10
private const val DEFAULT_SORT = ""
private const val DEFAULT_FILTER = ""


class PaginationRequest(
    page: Int?,
    pageSize: Int?,
    sort: String?,
    filter: String?
) {
    val page = page ?: DEFAULT_PAGE
    val pageSize = pageSize ?: DEFAULT_PAGE_SIZE
    val sort = sort ?: DEFAULT_SORT
    val filter = filter ?: DEFAULT_FILTER
    val pageable: Pageable
        get() = of(page, pageSize)
}
