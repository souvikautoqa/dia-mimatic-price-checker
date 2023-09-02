import React, {useMemo,useState,useEffect} from 'react'
import { useTable } from 'react-table'
import { COLUMNS } from './column'
import './table.css'
const {db} = require('../tests/firebaseConnection');
const { collection, getDocs,onSnapshot } = require('firebase/firestore');

export const BasicTable = () => {

  const [priceData, setPriceData] = useState([]);
  const collectionRef = collection(db,'matic-comparison-history');
  useEffect(() => {
        getDocs(collectionRef)
            .then((snapshot) => {
                // Map Firestore documents to an array of objects
                const data =  snapshot.docs.map((doc) => ({
                    id: doc.id,
                    network: doc.data().network,
                    dia_price: doc.data().dia,
                    cmc_price: doc.data().coinmarketcap,
                    comparison: doc.data().comparison,
                    timestamp: doc.data().time,
                }));
                setPriceData(data); // Set the data in the state        
            })
            .catch((error) => {
                console.error('Error fetching data from Firestore:', error);
            });

            // Add a real-time listener to update the table whenever a new document is added
            const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    // A new document was added, update the table with the new data
                    const newData = {
                    id: change.doc.id,
                    network: change.doc.data().network,
                    dia_price: change.doc.data().dia,
                    cmc_price: change.doc.data().coinmarketcap,
                    comparison: change.doc.data().comparison,
                    timestamp: change.doc.data().time,
                    };
        
                    setPriceData((prevData) => [newData, ...prevData]);
                }
                });
            });

            return () => {
                // Unsubscribe from the listener when the component unmounts
                unsubscribe();
            };
        },[]);

  const columns = useMemo(() => COLUMNS, [])
  const tableInstance = useTable({
    columns,
    data: priceData
  })

  const { 
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    rows, 
    prepareRow 
  } = tableInstance

  return (
    <div data-testid='pricetable'>
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) =>(
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {
                    rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                return (
                                    <td {...cell.getCellProps()} className={cell.row.original.comparison !== 0 ? 'red-text' : ''} >
                                        {cell.render('Cell')}
                                    </td>
                                );
                                })}
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    </div>
  )
}
