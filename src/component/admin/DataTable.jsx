import React from 'react';
import {Link} from "react-router-dom";
const STATUS = {
    NONE: 0,
    LOADING: 1,
    READY: 2,
    ERROR: 3
};


const ActionTd = ({actionPath, item}) => {


    return (
        <td>
            {
                actionPath.map((action, index) => {

                    if (typeof action.action === 'function') {

                        return (
                            <Link key={index} to={ action.path }
                                  onClick={(e) => {
                                      e.preventDefault();
                                      action.action(item[action.key]);
                                  }}
                            >{action.title}<i
                                className={'fa' + action.icon}/></Link>
                        )
                    } else {
                        return (
                            <Link key={index} to={ action.path + '/' + item[action.key] }>{action.title} <i
                                className={'fa' + action.icon}/></Link>
                        )
                    }

                })
            }
        </td>
    )
}
const DataTables = ({datas, actionPath, tableHeader}) => {


    const tableDatas = datas.items.map(data => {

        return {
            ...data
        }
    })

    datas = {...datas, items: tableDatas}


    if (datas.status === STATUS.READY) {

        return (
            <table>

                <thead>
                <tr>
                    {
                        tableHeader.map((header, index) => (

                            <td key={index}>{header.title}</td>
                        ))
                    }
                    <td>Actions</td>
                </tr>
                </thead>
                <tbody>

                {
                    datas.items.map(item => (
                        <tr data-id={item.id} key={item.id}>
                            {
                                tableHeader.map((header, index) => {
                                    return (

                                        <td key={index}>{item[header.key]}</td>
                                    )
                                })
                            }
                            <ActionTd {...{actionPath, item}}/>
                        </tr>
                    ))
                }
                </tbody>


            </table>
        )
    }

}

export default DataTables;