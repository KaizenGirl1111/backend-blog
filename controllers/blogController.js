const Blog = require("../model/blogModel");
const User = require("../model/userModel");

const createABlog = async (req, res) => {
  try {
    const blog = new Blog({ ...req.body ,userId: req.user._id });
    await blog.save();
    res.status(201).send(blog);
  } catch (error) {
    res.status(400).send({
      error,
      message: "Error in creating blog",
    });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const userId = req.id;
    console.log("userId",userId)
    if (!userId) {
      res.status(500).send("No user found with this id");
      return;
    }
    const match={}
    const page = req.query.page||1
    const limit = req.query.limit||5
    const skip = (page-1)*limit
    if(req.query.status){
      match.status = req.query.status
    }
    if(req.query.category){
      match.category = req.query.category
    }
    const sort = {}
    if(req.query.sortBy){
      const field = req.query.sortBy.split(",")
      console.log(field)
      field.forEach((item)=>{
        console.log("item",item)
        const [parts,value] = item.split(":")
        sort[parts] = value ==="desc"? -1:1
      })
      // const parts = req.query.sortBy.split(":")
      // console.log(parts)
   //   sort[parts[0]]=parts[1]
    //  sort[parts[0]] = parts[1] ==="desc"? -1:1
      let name={
        "full name":"poonam"
      }
      // console.log(name)
      // console.log(name[parts[0]])
      // console.log(name)
    //  console.log("sort",sort)
    }
    const allBlogs = await req.user.populate({path:"blogTable",match})
    console.log("allblogs.length",allBlogs.blogTable.length)
  //  const totalBlogs = await User.findById(userId).populate({path:"blogTable",match})
    const blogs =await User.findById(userId).populate({path:"blogTable",match,options:{
      limit,
      skip,
      sort
    }});
   // console.log(blogs);
    res.status(200).send({message:"Fetch all blogs",query:req.query,
     // totalBlogsCount:totalBlogs.blogTable.length,
      allBlogsCount:allBlogs.blogTable.length,
      blogs:blogs.blogTable});
  } catch (error) {
    res.status(400).send({
      error,
      message: "Error in fetching blogs",
    });
   }
};

const getABlog = async (req, res) => {
  try {
    const _id = req.params.id;
    if (!_id) {
      res.send("Blog not found");
      return;
    }
    const userId = req.user._id;
    if (_id === undefined)
      res.status(500).send({ message: "Couldn't find id" });
    const blog = await Blog.findById({ _id, userId });
    console.log(blog);
    res.status(200).send({message:"Fetch a blog",blog});
  } catch (error) {
    res.status(400).send({
      error,
      message: "Couldn't load blog",
    });
  }
};

const editABlog = async (req, res) => {
  try {
    const _id = req.params.id;
    const userId = req.user._id;
    if (_id == undefined) {
      res.status(500).send({ message: "Couldn't find id of blog" });
      return;
    }
    const blog = await Blog.findOneAndUpdate({ _id, userId }, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(blog);
    res.status(200).send({message:"Blog updated successfully",blog});
  } catch (error) {
    res.status(400).send({
      error,
      message: "Couldn't edit blog",
    });
  }
};

const deleteABlog = async (req, res) => {
  try {
    const _id = req.params.id;
    const userId = req.user._id;
    if (_id == undefined){
    res.status(400).send({ message: "Couldn't find id in params" });
    return;
  }
    const blog = await Blog.findOneAndDelete({ _id, userId });
    if(blog==null||blog==undefined){
      res.status(500).send({message:"Couldn't find blog"})
      return;
    }
    console.log(blog);
    res.send({message:"Blog deleted successfully",blog});
  } catch (error) {
    res.status(400).send({
      error,
      message: "Error in deleting blog",
    });
  }
};

module.exports = { createABlog, editABlog, getABlog, deleteABlog, getAllBlogs };
