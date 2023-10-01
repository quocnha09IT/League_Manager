import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateTeamDto } from './http/dto/create-team.dto';
import { Team } from './entities/team.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamRepository } from './repositories/team.repository';
import { League } from '../leagues/entities/league.entity';
import { PlayerService } from '../players/player.service';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { uuid } from 'uuidv4';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class TeamService {
  constructor(@InjectRepository(Team)
  private teamRepository: TeamRepository,
  @Inject(forwardRef(() => PlayerService))
  private readonly playerService: PlayerService,
  private readonly configService: ConfigService,
){}private containerName: string; 

  async GetTeam():Promise<Team[]>{
    return await this.teamRepository.find()
  }

  async findAll():Promise<Team[]> {
    const queryBuilder = this.teamRepository.createQueryBuilder('team')
      .leftJoinAndSelect('team.players', 'players')
      .getMany()
    return queryBuilder;
  }

  async findByIdWithPlayers(id: number): Promise<Team> {
    const queryBuilder = this.teamRepository.createQueryBuilder('team')
      .leftJoinAndSelect('team.players', 'players')
      .where('team.id = :id', { id })
      .getOne();
    return queryBuilder;
  }

  async findTeamId(teamId : number):Promise<Team>{
    const team =   await this.teamRepository.findOneBy({
      id : teamId
    })
      return team;
  }

  async findTeam(id : number):Promise<Team[]>{
    return await this.teamRepository.findBy({id})
  }

  async findLeague(id: number):Promise<Team>{
    return this.teamRepository.findOne({where:{id}});
  }

  async getLeagueOfTeam(id : number):Promise<Team[]>{
    return this.teamRepository.find({
      relations:{ leagues: true},
      where :{
        id :id 
      }
    })
  }

  async searchTeam(key: string):Promise<Team[]>{
    return await this.teamRepository.createQueryBuilder('team').select()
    .leftJoinAndSelect('team.players','player')
    .where('nameteam ILIKE :searchQuery', { searchQuery: `%${key}%` })
    .orWhere('player.playername ILIKE :searchQuery', { searchQuery: `%${key}%` })
    .orderBy('nameteam', 'DESC')
    .getMany()

  }

  async getBlobServiceInstance(): Promise<BlobServiceClient> { 
    const connectionString = this.configService.get('CONNECTION_STRING'); 
    const blobClientService = await BlobServiceClient.fromConnectionString( connectionString, ); 
    return blobClientService; 
  } 

  async getBlobClient(imageName: string): Promise<BlockBlobClient> {
    const blobService = await this.getBlobServiceInstance(); 
    const containerName = this.containerName; 
    const containerClient = blobService.getContainerClient(containerName); 
    const blockBlobClient = containerClient.getBlockBlobClient(imageName); 
    return blockBlobClient; 
 } 

  async  uploadFile(file: Express.Multer.File, containerName: string):Promise<string> { 
    this.containerName = containerName; 
    const extension = file.originalname.split('.').pop(); 
    const file_name = uuid() + '.' + extension; 
    const blockBlobClient = await this.getBlobClient(file_name);
    const fileUrl = blockBlobClient.url; 
    await blockBlobClient.uploadData(file.buffer);
    console.log(blockBlobClient) 
    return fileUrl; 
 } 

  async saveUrl(createTeam: CreateTeamDto,file_url: string):Promise<void> { 
    const league = new League()
    league.id = createTeam.leagueId;
    const team = new Team();
    team.leagues = [league];
    team.nameteam = createTeam.nameteam;
    team.logoTeam = file_url
    await this.teamRepository.save(team); 
  } 

  async deleteTeam(id: number, containerName: string):Promise<void> {
    let getFile ='';
    const findTeam = await this.teamRepository.findOne({ where: { id } });
    const file_image = findTeam?.logoTeam
    if(file_image){
      getFile = file_image.split('/').pop()
    }
    try {
      this.containerName = containerName;
      const blockBlobClient = await this.getBlobClient(getFile);
      await blockBlobClient.deleteIfExists();
    } catch (error) {
      console.log(error);
    }
    await this.teamRepository.delete(id)
  }

  async uploadLogoTeam(upload:string,id: number){
    await this.teamRepository.update(id,{logoTeam:upload})
  }
}
