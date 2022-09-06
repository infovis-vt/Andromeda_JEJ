function callback(div_id, data){
    
    console.log(data)
    
    // get 2Ddata from notebook
    // render 2D data as a draggable scatter plot
    comm = new CommAPI("get_data", (data) => {
        scatter
    });
    
    
    
    
    // send weights to notebook 
    comm.call(data);
}

