import { Stats } from '../../constant/stats';
import quizConnDB from './config'

const createQuizTable = async () => {
    
    try {
        
        quizConnDB.transaction((tx) => {
            tx.executeSql(
              `
              CREATE TABLE IF NOT EXISTS stats (
                id INTEGER PRIMARY KEY,
                points INTEGER
              )
              `,
              [],
              (_, result) => {
                console.log('Table created successfully:', result);
              },
              (_, error) => {
                console.log('Error creating stats table:', error);
                return false
              }
            );
          });
    } catch (error) {
        console.log("Error creating stats: ", error);
    return false;
    }

}

const addStats =  async (data:Stats[]) => {

    try {

        if(data.length != 0 || data != undefined){

           data.forEach((list:Stats) => {
                const { id, points } = list;

                quizConnDB.transaction((tx) => {

                    tx.executeSql(`INSERT INTO stats (id, points) VALUES (?, ?)`,
                    [id, points],
                    () => {
                        console.log("successful adding stats")
                        return true
                    },(error) => {
                        console.log("Error Adding Stats: ", error)
                        return false
                     }
                    )
                })
            })
        } else {

            return false
        }

      return true

    } catch (error) {
        console.log("Error Adding Stats: ", error)
        return error
    }
}

const updateStats =async (id:number, points:number) => {
    
    try {
        
        return new Promise<boolean>((resolve, reject) =>{
            quizConnDB.transaction((tx) => {
                tx.executeSql(`UPDATE stats SET points = ? WHERE id = ?`,
                [points, id],
                (_, result) => {
                    if (result.rowsAffected > 0) {
                        console.log("Update Stats successful");
                        resolve(true); 
                      } else {
                        reject(false); 
                      }
                },
                (_, error) => {
                    console.log("Error Updating Stats: ", error);
                    reject(false); 
                    return false
                  }
                )
            },(error) => {
                console.log("Updating error: ", error);
                reject(false);
            },() => {
                console.log("Update completed");
                return true
            })
        })
    } catch (error) {
        console.log("Error Updating Stats: ", error)
        return false
    }
}

const getAllStats = async () => {
    return new Promise<Stats[]>((resolve, reject) => {
      quizConnDB.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM stats`,
          [],
          (_, { rows }) => {
            if (rows && rows._array) {
              const stats: Stats[] = rows._array.map((row: Stats) => ({
                id: row.id,
                points: row.points,
              }));
              resolve(stats);
            } else {
              resolve([]); // Return an empty array if rows._array is undefined
            }
          },
          (error) => {
            reject(error);
            return false
          }
        );
      });
    });
  };

const getStats = async (id:number) => {
    
        return new Promise<Stats[]>((resolve, reject) => {
            quizConnDB.transaction((tx) => {
                tx.executeSql(`SELECT * FROM stats WHERE id = ?`, [id],(_, {rows }) =>{
                    const stats: Stats[] = rows._array.map((row:Stats) => ({
                        id:row.id,
                        points:row.points
                    }));
                    resolve(stats)
                },(error) => {
                    reject(error)
                    return false
                });
            });
        });
}

const resetStats = async (data:Stats[]) => {
    
    try {

        if(data.length != 0 || data != undefined){

            await data.forEach((list:Stats) => {
                 const { id, points } = list;
 
                 quizConnDB.transaction((tx) => {
 
                     tx.executeSql(`UPDATE stats SET points = ? WHERE id = ?`,
                     [points, id],
                     () => {
                         console.log("successful reset stats")
                         return true
                     },(error) => {
                         console.log("Error resetting Stats: ", error)
                         return false
                      }
                     )
                 })
             })
         } else {
 
             return false
         }
 
       return true
        
    } catch (error) {
        console.log("Error resetting Stats: ", error)
        return false
    }
}

const tableMaster = async () => {
    try {
      return new Promise((resolve, reject) => {
        quizConnDB.transaction(tx => {
          tx.executeSql(
            'SELECT name FROM sqlite_master WHERE type="table"',
            [],
            (txObj, { rows }) => {
              const tableNames = rows['_array'].map(row => row.name);
              console.log('Table names:', tableNames);
              resolve(tableNames);
            },
            (error) => {
              console.log('Error:', error);
              reject(error);
               return false
            }
          );
        });
      });
    } catch (error) {
      console.log("Error: ", error);
      throw error;
    }
  };
  

export {
    createQuizTable,
    addStats,
    updateStats,
    getAllStats,
    getStats,
    resetStats,
    tableMaster
}