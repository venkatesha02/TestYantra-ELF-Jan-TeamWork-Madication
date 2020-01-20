import React, { useState } from 'react';
import MaterialTable from 'material-table';
import Axios from 'axios';
import { useEffect } from 'react';

export default function DataTable(props) {

  const [items, setItems] = useState({ all: [] })

  const [state] = useState({

    columns: [

      { title: 'Product Name', field: 'productName' },

      { title: 'Company Name', field: 'companyName' },

      { title: 'Price', field: 'price', type: 'numeric' },

      { title: 'Quantity', field: 'quantity', type: 'numeric' },

      { title: 'Medicine Type', field: 'type' },

      { title: 'Description', field: 'description' },

      { title: 'Image', field: 'productImage' },

      { title: 'Image', field: 'img' },
    
    ],

    data: []
  });

  useEffect(() => {
    getAllAccounts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Getting all data from server

  let getAllAccounts = async () => {
    const url = `https://react-medical-app.firebaseio.com/addmedicine.json`

    try {
      const response = await Axios.get(url)
      if (response.status === 200) {
        //let img;
        let fetchedAccount = []
        for (let key in response.data) {
          let account = response.data[key]

          //console.log('asdjfh',account.productImage)
          fetchedAccount.push({
            ...account,
            id: key,
            //img: <img src={account.productImage} width='50px' height='50px' alt='...'></img>

          })
          //console.log("all ", fetchedAccount)

          setItems({
            ...items.all,
            all: fetchedAccount,
          })
          // allDataSet()
        }
      }
    }
    catch (err) {
      console.log("Erroo ", err)
    }
  }

  return (
    <div className='container-fluid mt-3'>
      <MaterialTable
        title="Editable Example"
        columns={state.columns}
        data={items.all.map(val => {
          //console.log(val)
          return val
        })}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setItems(prevState => {
                  const data = [...items.all];
                  data.push(newData);
                  setItems({
                    all: data
                  })
                  return { ...items, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setItems(prevState => {
                    const data = [...items.all];
                    data[data.indexOf(oldData)] = newData;
                    setItems({
                      all: data
                    })
                    return { ...items, data };
                  });
                }
              }, 600);
            }),

          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setItems(prevState => {
                  const data = [...items.all];
                  data.splice(data.indexOf(oldData), 1);
                  setItems({
                    all: data
                  })
                  return { ...items, data };
                });
              }, 600);
            }),
        }}
      />
    </div>
  );
}