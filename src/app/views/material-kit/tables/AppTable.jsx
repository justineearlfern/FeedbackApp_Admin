import React, { useState, useEffect } from 'react';
import { Breadcrumb, SimpleCard } from "matx";
import MaterialTable from "material-table";
import Connection from "../../../../common/Connection";
const connection = new Connection();

const AppTable = () => {

  const path = window.location.pathname;
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function load() {
      if (path === "/material/table1") {
        setTitle("Reports")
        await getReports();
        await setLoaded(true);
      } else if (path === "/material/table2") {
        setTitle("Repairs")
        await getRepairs();
        await setLoaded(true);
      } else if (path === "/material/table3") {
        setTitle("Recommend")
        await getRecommend();
        await setLoaded(true);
      } else if (path === "/material/table4") {
        setTitle("Recognize")
        await getRecognize();
        await setLoaded(true);
      } else if (path === "/material/table5") {
        setTitle("React")
        await getReact();
        await setLoaded(true);
      }
    }
    load()
  }, []);

  const getReports = async () => {
    try {
      const reports = await connection.get('api/v1/report?status=1')
      setColumns([
        { title: "Category", field: "category", editable: 'never', },
        { title: "Subject", field: "subject", },
        { title: "Description", field: "description", },
        { title: "Created At", field: "createdAt", editable: 'never', }])
      setData(reports.data.data);
      console.log(reports.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getRepairs = async () => {
    try {
      const repair = await connection.get('api/v1/repair?status=1')
      setColumns([
        { title: "Subject", field: "subject", },
        { title: "Category", field: "category", editable: 'never', },
        { title: "Description", field: "description", },
        { title: "Created At", field: "createdAt", editable: 'never', }
      ])
      setData(repair.data.data)
      console.log(repair.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getRecommend = async () => {
    try {
      const recommend = await connection.get('api/v1/recommend?status=1')
      setColumns([
        { title: "Description", field: "description", },
        { title: "Subject", field: "subject", editable: 'never', },
        { title: "Description", field: "description", },
        { title: "Created At", field: "createdAt", editable: 'never', }
      ])
      setData(recommend.data.data)
      console.log(recommend.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getRecognize = async () => {
    try {
      const recognize = await connection.get('api/v1/recognize?status=1')
      setColumns([
        { title: "Subject", field: "subject", },
        { title: "Category", field: "category", editable: 'never', },
        { title: "Description", field: "description", },
        { title: "Subject", field: "subject", editable: 'never', },
        { title: "Description", field: "description", },
        { title: "Created At", field: "createdAt", editable: 'never', }
      ])
      setData(recognize.data.data)
      console.log(recognize.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getReact = async () => {
    try {
      const react = await connection.get('api/v1/react?status=1')
      setColumns(
        [{ title: "Department", field: "department.department", editable: 'never', },
        { title: "Description", field: "description", },
        { title: "Rating", field: "rating", editable: 'never', },
        { title: "Created At", field: "createdAt", editable: 'never', }
        ])
      setData(react.data.data)
      console.log(react.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteData = async (data) => {
    if (path === "/material/table1") {
      await connection.put(`api/v1/report/${data['_id']}`, { status: 0 })
      await getReports();
    } else if (path === "/material/table2") {
      await connection.put(`api/v1/repair/${data['_id']}`, { status: 0 })
      await getRepairs();
    } else if (path === "/material/table3") {
      await connection.put(`api/v1/recommend/${data['_id']}`, { status: 0 })
      await getRecommend();
    } else if (path === "/material/table4") {
      await connection.put(`api/v1/recognize/${data['_id']}`, { status: 0 })
      await getRecognize();
    } else if (path === "/material/table5") {
      await connection.put(`api/v1/react/${data['_id']}`, { status: 0 })
      await getReact();
    }
  }

  return (
    <div className="m-sm-30">
      <div className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Material", path: "/material" },
            { name: "Table" }
          ]}
        />
      </div>

      <SimpleCard title={title}>
        {loaded
          ? <MaterialTable
            title={title}
            columns={columns}
            data={data}
            options={{
              grouping: true,
              searchFieldAlignment: "right",
              sorting: true
            }}
            editable={{
              isDeletable: rowData => !rowData.solution,
              onRowDelete: oldData =>
                new Promise(async resolve => {
                  const editData = [...data];
                  editData.splice(editData.indexOf(oldData), 1);
                  await deleteData(oldData)
                  resolve(setData(editData));
                })
            }}
            detailPanel={(rowData) => {
              console.log(rowData)
              return (
                <>
                  <p>User: {rowData.user.name}</p>
                  <p>Email: {rowData.user.email}</p>
                  {rowData.photo ? <img style={{ width: 100, height: 100 }} src={rowData.photo} alt={rowData.photo} /> : null}

                </>
              )
            }}
          /> : null}

      </SimpleCard>
    </div>
  );
};

export default AppTable;
