var path = require('path')
const dotenv = require('dotenv')
dotenv.config()
const fauna = require('faunadb')
const q = fauna.query


module.exports.createPages = async({actions,graphql})=>{



    const {createPage} = actions

    const adminClient = new fauna.Client({secret:process.env.FAUNA_KEY})

    const result = await adminClient.query(

        q.Map(
          q.Paginate(q.Documents(q.Collection('VirtualLolly'))),
          q.Lambda(x=>q.Get(x))
        )
      )
      result.data.forEach((value)=>{
        
        createPage({
            path:`/Lolly/${value.data.link}`,
            component: path.resolve('./src/templates/Lolly.tsx'),
            context:{
                data:value
            }
        })
      })        

}