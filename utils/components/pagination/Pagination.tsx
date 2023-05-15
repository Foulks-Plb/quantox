import { useEffect, useState } from "react";

const Pagination = ({ take, page, count, selectPageEvent }: { take: number, page: number, count: number, selectPageEvent: any } ) => {
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        const pageN = Math.ceil(count / take);
        setPageNumber(pageN);
    }, [page]);


    function choosePage(page: number) {
        selectPageEvent(page);
    }
    
  return (
    <div className="btn-group">
        {page - 3 > 0 && <button className="btn">...</button>}
        {page - 2 > 0 &&<button className="btn" onClick={() => choosePage(page - 2)}>{page - 2}</button>}
        {page - 1 > 0 && <button className="btn" onClick={() => choosePage(page - 1)}>{page - 1}</button>}
        <button className="btn btn-active" onClick={() => choosePage(page)}>{page}</button>
        {page + 1 <= pageNumber && <button className="btn" onClick={() => choosePage(page + 1)}>{page + 1}</button>}
        {page + 2 <= pageNumber && <button className="btn" onClick={() => choosePage(page + 2)}>{page + 2}</button>}
        {page + 3 <= pageNumber && <button className="btn">...</button>}
    </div>
  );
};

export default Pagination;
