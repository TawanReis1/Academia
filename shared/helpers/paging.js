class PagingHelper {
    build(query = {}) {

        const sort = {};
        const page = parseInt(query.page, 10) || 1;
        const limit = parseInt(query.limit, 10) || 10;

        let skip = (page - 1) * limit;
        skip = skip < 0 ? 0 : skip;

        Object.keys(query).forEach(key => {
            if (key.match('sort_')) {
                sort[key.replace('sort_', '')] = query[key] === 'asc' ? 1 : query[key] === 'desc' ? -1 : 1;
            }
        });

        return {
            page,
            limit,
            skip,
            sort
        }        
    }

    resolve(meta, total) {
        let pages = parseInt(total / meta.limit);

        if ((total % 2) > 0) {
            pages += 1;
        }

        if (pages === 0) {
            pages = 1;
        }

        return {
            "currentPage": meta.page,
            "itemsPerPage": meta.limit,
            "totalPages": pages,
            "totalItems": total
        }
    }
}

module.exports = new PagingHelper()