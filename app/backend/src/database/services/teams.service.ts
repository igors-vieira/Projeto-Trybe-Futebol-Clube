// import TeamsModel from '../models/Teams';
// import 'express-async-errors';
// import GetterErrors from '../utils/GetterErrors';

// export default class TeamsServices {
//   private teamsModel;
//   constructor() {
//     this.teamsModel = TeamsModel;
//   }

//   async getAllTeams(): Promise<TeamsModel[]> {
//     const teams = await this.teamsModel.findAll();

//     return teams;
//   }

//   async getId(id: number): Promise<> {
//     const teams = await this.teamsModel.findOne({ where: { id } });

//     if (!teams) throw new GetterErrors('dont find Id', 404);

//     return teams;
//   }
// }
