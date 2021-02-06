

import { Post } from '../../../khosravi/js/core/axiosHelper';


const api = {
    ageCategoryApi: "AgeCategory/GetAll",
    classRoomLevelApi: "ClassRoomLevel/GetAll",
    getAllTeacherAcademyClassSubjectApi: "ClassSubject/GetAllTeacherAcademyClassSubject",
    classRoomInsertApi: "ClassRoom/Insert"
}


const ProfileService = {
    getAgeCategory: (command, then) => {
        Post(api.ageCategoryApi, command, then )
    },
    getClassRoomLevel: (command, then) => {
        Post(api.classRoomLevelApi, command, then, false);
    },
    getAllTeacherAcademyClassSubject :(command ,then) => {
        let url  = `${api.getAllTeacherAcademyClassSubjectApi}?${command}`;
        Post(url,null, then);
    },
    classRoomInsert :(command ,then) => {
        Post(api.classRoomInsertApi,command, then);
    }
}
export default ProfileService;
