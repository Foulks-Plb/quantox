import { useEffect, useState } from 'react';
import { getCall } from '../../utils/ts/api';

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
            <th scope="col">Token</th>
            <th scope="col">Amount</th>
            <th scope="col">Blockchain</th>
            <th scope="col">App</th>
            <th scope="col">Type</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {history.map(function (item, i) {
            return (
              <tr key={i}>
                <th scope="row">{i}</th>
                <td>{item.action}</td>
                <td>{item.token}</td>
                <td>{item.amount}</td>
                <td>{item.locationBlockchain}</td>
                <td>{item.locationApp}</td>
                <td>{item.locationType}</td>
                <td>{item.processAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
