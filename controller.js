const item = require('./model');

const getItem =  (req,res)=>{
    item.find()
    .then((data) =>{
      return res.status(200).json({ success:true, items:data})
    })
    .catch(err => {
        return res.status(400).json({ success:false, error: err })
    })
};

const addItem = (req, res) =>{
    const Item = new item();
    Item.itemname = req.body.itemname;
    Item.description = req.body.description;

    Item.save(err =>{
        return res.json({ success: true});
    })
}

const getSelectedItem = (req,res)=>{
    const {id} = req.params;
    item.find({ _id:id})
    .then((data) =>{ 
        console.log(data)
       return res.status(200).json({ success:true, items:data })
    })
    .catch(err =>{
        return res.status(400).json({ success:false, error: err})
    })
};

const updateItem = (req,res) =>{
    const { id } = req.params;
    const { itemname, description } = req.body;
     item.findOneAndUpdate(id,{ itemname, description}, (err)=>{
        return res.status(200).json({ success:true})
    })
    .catch(err =>{
        return res.status(400).json({ success: false, error: err})
    })
}

const deleteItem = (req,res)=>{
    const {id} = req.body.params;
    item.deleteOne({_id: id}, (err) =>{
        return res.status(200).json({ success:true})
    })
    .catch(err =>{
        return res.status(400).json({ success: false, error: err})
    })
}


module.exports ={
    getItem,
    addItem,
    getSelectedItem,
    updateItem,
    deleteItem
}