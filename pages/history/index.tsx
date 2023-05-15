import { useEffect, useState } from 'react';
import { getCallPagination } from '@/utils/ts/api-base';
import { IPagination } from '@/utils/types/backend';
import Pagination from '@/utils/components/pagination/Pagination';

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);
  const [history, setHistory] = useState<IPagination>();

  useEffect(() => {
    if (isMounted) {
      getHistory(1);
    } else {
      setIsMounted(true);
    }
  }, [isMounted]);

  async function getHistory(skip: number) {
    const history: IPagination = await getCallPagination('/api/history', {
      take: 5,
      skip: skip,
    });
    setHistory(history);
  }

  function selectPage(page: number) {
    getHistory(page);
  }

  return (
    <>
    {history ? <div>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Action</th>
            <th scope="col">TokenFrom</th>
            <th scope="col">LocationFrom</th>
            <th scope="col">TokenTo</th>
            <th scope="col">LocationTo</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {history?.data?.map(function (item, i) {
            return (
              <tr key={i}>
                <th scope="row">{i}</th>
                <td>{item.action}</td>
                <td>
                  <div>{item.amountFrom + ' ' + item.tokenFrom}</div>
                </td>
                <td>
                  <div>{'blockchain: ' + item.locationBlockchainFrom}</div>
                  <div>{'app: ' + item.locationAppFrom}</div>
                  <div>{'type: ' + item.locationTypeFrom}</div>
                </td>
                <td>
                  <div>{item.amountTo + ' ' + item.tokenTo}</div>
                </td>
                <td>
                  <div>{'blockchain: ' + item.locationBlockchainTo}</div>
                  <div>{'app: ' + item.locationAppTo}</div>
                  <div>{'type: ' + item.locationTypeTo}</div>
                </td>
                <td>{item.processAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination take={history?.take || 5} page={history?.skip || 1} count={history?.count || 0} selectPageEvent={(e: any)=>selectPage(e)}/>
    </div> : <div>no data</div>}
    </>
  );
}
