import React, { useEffect, useState } from "react";
import "../../styles/bodyTable.css";
import GroupeService from "../../services/groupe-service";
import Task from "./task";
import {  useParams } from 'react-router-dom';
import storageService from "../../services/storage-service";
import axios from "axios";
import Taskss from "./task";
import TaskService from "../../services/task-service";




const Teamsdetailpage = () => {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const { id } = useParams();
  const [sort, setSort] = useState("title");
  const [order, setOrder] = useState("asc");

  const orderTasks = (e, newSort) => {
    e.preventDefault();
    setSort(newSort);
    setOrder(order === "asc" ? "desc" : "asc");

    setTasks((prevTasks) => {
      return prevTasks.sort((a, b) => {
        if (newSort === "title") {
          if (order === "asc") {
            return a.topic.localeCompare(b.topic);
          } else {
            return b.topic.localeCompare(a.topic);
          }
        } else if (newSort === "dateStart") {
          if (order === "asc" && <span>&#9650</span>) {
            return a.startDate.localeCompare(b.startDate);
          } else {
            return b.startDate.localeCompare(a.startDate);
          }
        } else if (newSort === "deadlineDate") {
          if (order === "asc") {
            return a.endDate.localeCompare(b.endDate);
          } else {
            return b.endDate.localeCompare(a.endDate);
          }
        } else if (newSort === "priority") {
          if (order === "asc") {
            return a.priority - b.priority;
          } else {
            return b.priority - a.priority;
          }
        }
      });
    });
  };


  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const accessToken = storageService.retrieveAccessToken();
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/task/find-by-group/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } });
      setTasks(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error checking or inviting users to the group:', error);
    } 
      
    
  };

  const deleteTask = (e, id) => {
    e.preventDefault();
    TaskService.deleteTaskById(id).then((res) => {
      setTasks((prevTasks) => {
        return prevTasks.filter((task) => task.id !== id);
      });
    });
  };
  const resolveTask = (e, id) => {
    TaskService.setTaskInactive(id).then((res) => {
      setTasks((prevTasks) => {
        window.location.reload();
        return prevTasks.filter((task) => task.id !== id);
      });

      // Reload the page after the task is resolved
    });
  };

  
  const bodyStyle = {
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
    fontSize: "13px",
    color: "#555",
    background: "none",
    marginTop: "100px",
  };

  const noTasksStyle = {
    textAlign: "center",
    fontSize: "18px",
    color: "#888",
    marginTop: "20px",
  };
  
  const columnButton = {
    background: 'none',
    color: 'inherit',
    border: 'none',
    padding: 0,
    fontFamily: 'inherit', // Adjust this line based on your specific use case
    cursor: 'pointer',
    outline: 'inherit',
    fontWeight: 'bold'
  };

  return (
    <div style={bodyStyle}>
      <h1 className="text-center text-dark mb-5 font-weight-bold">Teams Tasks</h1>
      <div className="container bootstrap snippets bootdey">
        <div className="table-responsive">
          {loading ? (
            <p>Loading...</p>
          ) : tasks == null || tasks.length === 0 ? (
            <p style={noTasksStyle}>
              No Teams Created... <a href="#">create</a>
            </p>
          ) : (
            <table className="table colored-header datatable project-list">
              <thead>
                <tr>
                  <th className="text-dark table-columns-text">
                    <button style={columnButton}
                      onClick={(e) => {
                        orderTasks(e, "title");
                      }}
                    >
                      Title {sort === "title" && (order === "asc" ? <span style={{ fontSize: '10px' }}>&#9650;</span> : <span style={{ fontSize: '10px' }}>&#9660;</span>)}
                    </button>
                  </th>
                  <th className="text-dark table-columns-text">
                    <button style={columnButton}
                      onClick={(e) => {
                        orderTasks(e, "dateStart");
                      }}
                    >
                      Date Start {sort === "dateStart" && (order === "asc" ? <span style={{ fontSize: '10px' }}>&#9650;</span> : <span style={{ fontSize: '10px' }}>&#9660;</span>)}
                    </button>
                  </th>
                  <th className="text-dark table-columns-text">
                    <button style={columnButton}
                      onClick={(e) => {
                        orderTasks(e, "deadlineDate");
                      }}
                    >
                      Deadline Date {sort === "deadlineDate" && (order === "asc" ? <span style={{ fontSize: '10px' }}>&#9650;</span> : <span style={{ fontSize: '10px' }}>&#9660;</span>)}
                    </button>
                  </th>

                  <th className="text-dark table-columns-text">
                    <button style={columnButton}
                      onClick={(e) => {
                        orderTasks(e, "priority");
                      }}
                    >
                      Priority {sort === "priority" && (order === "asc" ? <span style={{ fontSize: '10px' }}>&#9650;</span> : <span style={{ fontSize: '10px' }}>&#9660;</span>)}
                    </button>
                  </th>
                  <th className="my-custom-td text-dark table-columns-text">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <Taskss
                    task={task}
                    deleteTask={deleteTask}
                    resolveTask={resolveTask}
                    key={task.id}
                  />
                ))}
              </tbody>
            </table>
            
          )}
        </div>
      </div>
    </div>
  );
};

export default Teamsdetailpage;
