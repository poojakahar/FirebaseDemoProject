import {db} from "../FirebaseConfig/config";

export default APIs = (data={}, type="get") => {
  switch(type) {
    case "post":
      return db.ref("/users").push(data)
        .then((res)=>{
          return Promise.resolve(res)
        })
        .catch((err)=>{
          return Promise.reject(err)
        });

    case "get":
      return new Promise((resolve,reject)=>{
        db.ref("/users").on('value', (snapshot) => {
          let data = snapshot.val();
          let items = Object.values(data);
          let item = {
            "data" : {
              ...data
            }
          }
          return resolve(item);
        })
      })

    case "put":
      return db.ref("/users/"+data.id).update(data.obj)
        .then((res)=>{
          return Promise.resolve(data.id)
        })
        .catch((err)=>{
          return Promise.reject(err)
        });
  }
}
