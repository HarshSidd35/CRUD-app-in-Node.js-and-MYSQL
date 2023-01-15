const mysql = require('mysql');
const { search } = require('../routes/user');


// MySql Connection pool

const pool = mysql.createPool({
    connectionLimit :100,
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});



//View Users
exports.view = (req,res) =>
{
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log("Connected " + connection.threadId);
        
        connection.query('SELECT * FROM user WHERE status="active"',(err,rows)=>{
            connection.release();
            if(!err){
                res.render('home',{rows});
            }
            else{
                console.log(err);
            }
            console.log(rows); 
            connection.destroy();
        });

    });
}

exports.delete = (req,res) =>
{
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log("Connected " + connection.threadId);
        
        connection.query('DELETE FROM user WHERE UID = ?',[req.params.id],(err,rows)=>{
            connection.release();
            if(!err){
                res.redirect('/');
            }
            else{
                console.log(err);
            }
            connection.destroy();
        });

    });
}


//View Users
exports.find = (req,res) =>
{
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log("Connected " + connection.threadId);

        let searchtext = req.body.search;    
        console.log(searchtext);
        const sqlquery = `SELECT * FROM user WHERE name LIKE '${searchtext}' OR mail LIKE '${searchtext}' or city LIKE '${searchtext}'`;
        connection.query(sqlquery,(err,rows)=>{
            connection.release();
            if(!err){
                res.render('home',{rows});
            }
            else{
                console.log(err);
            }
            console.log(rows); 
            connection.destroy();
        });
    });
}
exports.addUser = (req,res)=>{
    res.render('add-user');
}
//Add New User
exports.add = (req,res)=>
{
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log("Connected " + connection.threadId);

        const {name,city,mail,comments}  = req.body;    
       


        connection.query('INSERT INTO USER SET name = ? , city = ? ,mail = ? ,comments = ?',[name,city,mail,comments],(err,rows)=>{
            connection.release();
            if(!err){
                res.render('add-user',{alert:'User Added Successfully.'});
            }
            else{
                console.log(err);
            }
            console.log(rows); 
            connection.destroy();
        });
    });

}


exports.editUser = (req,res) =>
{
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log("Connected " + connection.threadId);
        
        // const sqlquery = `SELECT * FROM user WHERE name LIKE '${searchtext}' OR mail LIKE '${searchtext}' or city LIKE '${searchtext}'`;
        connection.query('select * from user where UID = ?',[req.params.id],(err,rows)=>{
            connection.release();
            if(!err){
                res.render('edit-user',{rows});
            }
            else{
                console.log(err);
            }
           
            connection.destroy();
        });
    });
}

exports.updateUser = (req,res) =>
{
    const {name,city,mail,comments}  = req.body;    
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log("Connected " + connection.threadId);

        connection.query('UPDATE user SET name =?, city =? , mail =? , comments=? WHERE UID =?',[name,city,mail,comments,req.params.id],(err,row)=>{
        connection.release();
            if(!err){
                pool.getConnection((err,connection)=>{
                    if(err) throw err;      
                    connection.query('select * from user where UID = ?',[req.params.id],(err,rows)=>{
                        connection.release();
                        if(!err){
                            res.render('edit-user',{rows , alert:`Update in User named : ${name}`});
                        }
                        else{
                            console.log(err);
                        }
                       
                        connection.destroy();
                    });
                });
            }
            else{
                console.log(err);
            }
           
            connection.destroy();
        });
    });
}

exports.viewUser = (req,res) =>
{
    pool.getConnection((err,connection)=>{
        if(err) throw err;
        console.log("Connected " + connection.threadId);
        
        connection.query('SELECT * FROM user WHERE UID = ?',[req.params.id],(err,rows)=>{
            connection.release();
            if(!err){
                res.render('view-user',{rows});
            }
            else{
                console.log(err);
            }
            console.log(rows); 
            connection.destroy();
        });

    });
}