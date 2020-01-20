import React, { useState } from 'react';
import MaterialTable from 'material-table';
import Axios from 'axios';
import { useEffect } from 'react';

export default function DataTable(props) {

  const [items, setItems] = useState({ all: [] })

  const [state] = useState({

    columns: [

      { title: 'User Name', field: 'userName' },

      { title: 'Email', field: 'userEmail' },

      { title: 'Mobile Number', field: 'userMobile'},

      { title: 'Gender', field: 'gender' },
    
    ],

    data: []
  });

  useEffect(() => {
    getAllAccounts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Getting all data from server

  let getAllAccounts = async () => {
    const url = `https://react-medical-app.firebaseio.com/addUser.json`

    try {
      const response = await Axios.get(url)
      if (response.status === 200) {
        //let img;
        let fetchedAccount = []
        for (let key in response.data) {
          let account = response.data[key]

          fetchedAccount.push({
            ...account,
            id: key,

          })

          setItems({
            ...items.all,
            all: fetchedAccount,
          })
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
          return val
        })}
        editable={{
        //   onRowAdd: newData =>
        //     new Promise(resolve => {
        //       setTimeout(() => {
        //         resolve();
        //         setItems(prevState => {
        //           const data = [...items.all];
        //           data.push(newData);
        //           setItems({
        //             all: data
        //           })
        //           return { ...items, data };
        //         });
        //       }, 600);
        //     }),
        //   onRowUpdate: (newData, oldData) =>
        //     new Promise(resolve => {
        //       setTimeout(() => {
        //         resolve();
        //         if (oldData) {
        //           setItems(prevState => {
        //             const data = [...items.all];
        //             data[data.indexOf(oldData)] = newData;
        //             setItems({
        //               all: data
        //             })
        //             return { ...items, data };
        //           });
        //         }
        //       }, 600);
        //     }),

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