import { gql, ApolloServer } from "apollo-server";
import { config } from "../config";
import { DutyService } from "./service";

const dutyService = new DutyService();

const typeDefs = gql`
  type Duty {
    id: String!
    name: String!
  }

  type Query {
    allDuties: [Duty]
    findDuty(id: String!): Duty
  }

  type Mutation {
    addDuty(id: String!, name: String!): Duty
    editDuty(id: String!, name: String!): Duty
    deleteDuty(id: String!): String
  }
`;
const resolvers = {
  Query: {
    allDuties: () => dutyService.getAllDuties(),
    findDuty: (root: any, args: any) => dutyService.getDuty(args),
  },
  Mutation: {
    addDuty: (root: any, args: any) => dutyService.createDuty(args),
    editDuty: (root: any, args: any) => dutyService.editDuty(args),
    deleteDuty: (root: any, args: any) => dutyService.deleteDuty(args),
  },
};
const setHttpPlugin = {
  async requestDidStart() {
    return {
      async willSendResponse({ response }: { response: any }) {
        if (
          response?.errors?.length &&
          response?.errors?.[0].status === "BAD_REQUEST"
        ) {
          response.http.status = 400;
        }
        if (
          response?.errors?.length &&
          response?.errors?.[0].status === "NOT_FOUND"
        ) {
          response.http.status = 404;
        }
      },
    };
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [setHttpPlugin],
});

const port = config.PORT;
server.listen(port).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
