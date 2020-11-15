const fauna = require('faunadb')
const  q = fauna.query
const dotenv = require('dotenv')
dotenv.config()
const adminClient =  new fauna.Client({secret:process.env.FAUNA_KEY});

const {ApolloServer,gql} = require('apollo-server-lambda')

const typeDefs = gql`

type virtuallolly{
  allData:String!

}
input AddLolly{
  bottomcolor: String!
  from: String!,
  link: String!,
  message: String!,
  middlecolor: String!,
  to: String!,
  topcolor: String!,
}
type Mutation{
      addLolly(input:AddLolly):virtuallolly!
}
type Query {
  Data:[virtuallolly]
}
`

const resolvers = {
  Query:{

    Data:async()=>{

      const result = await adminClient.query(

        q.Map(
          q.Paginate(q.Documents(q.Collection('VirtualLolly'))),
          q.Lambda(x=>q.Get(x))
        )
      )
      const finalresult = JSON.stringify(result)
      const data = [{
        allData:finalresult
      }]
      
      return data
    }
  },
  Mutation:{
    addLolly:async(e,{input})=>{

      return {
        allData:"Success"
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

exports.handler = server.createHandler();