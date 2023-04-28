import { useEffect, useState } from 'react';
import { getCall } from '../../utils/ts/api-base';

export default function Page() {
  
  const [isMounted, setIsMounted] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (isMounted) {
      getHistory();
    } else {
      setIsMounted(true);
    }
  }, [isMounted]);

  async function getHistory() {
    const history = await getCall('/api/history');
    setHistory(history);
  }

  return (
    <div>
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
          {history.map(function (item, i) {
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
    </div>
  );
}
