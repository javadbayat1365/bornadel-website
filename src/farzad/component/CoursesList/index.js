import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Row, Col, InputGroup } from 'react-bootstrap';
import './CoursesList.css';
import Button from 'react-bootstrap/Button';
import CoursesListService from './CoursesListService';
import toastr from 'toastr';
import {DateInput} from 'react-hichestan-datetimepicker';
import { SetToken } from '../../../khosravi/js/core/axiosHelper';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const BootstrapInput = withStyles((theme) => ({
    root: {
      width: '100%'
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 14,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

  const GreenCheckbox = withStyles({
    root: {
      color: 'rgb(174,175,178)',
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

const CoursesList = () => {
    const [state, setState] = useState({
        classRoomID: "",
        classRoomServerRef: 2,
        classRoomClassSubjectRef: 3,
        classRoomApproveAspNetUsersRef: 0,
        classRoomAcceptAspNetUsersRef: 0,
        classRoomSubject: "",
        classRoomPrice: "",
        classRoomDuration: "",
        classRoomStartTime: "",
        classRoomNumberSessions: "",
        classRoomQuorum: "",
        classRoomDateTime: "",
        classRoomLevelName: "",
        ageCategoryName: "",
        educationSubjectName: "",
        teacherFullName: "",
        classRoomClassLink: "string",
        academyName: null,
        teacherScore: null,
        educationSubjectIconeLink: "",
        academyID: null,
        classRoomDiscount: null,
        lastPrice: "",
        teacherPhotoLink: "",
        academyHaveDocument: null,
        academyPhotoLink: null,
        active: null,
        academyScore: null,
        classRoomEndTime: "",
        classRoomSumTime: null,
        allClassRooms:[],
        allAgeCategories: [],
        allClassRoomLevels: [],
        saturday: false,
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    const handleChangeChecked = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };

    useEffect(() => {
        let token = localStorage.getItem("token");
        if(token && token != ''){
            SetToken(token);
        }else{
           window.location.href = '/login';
        }
    },[]);

    useEffect(() => {
        getClassRoomLevel()
        getAgeCategory()
        getAllTeacherAcademyClassSubject()
     },[])

    const getAgeCategory = () => {
        let command = {
            ageCategory_ID: 0
        }
        CoursesListService.getAgeCategory(command, response => {
            if (response.success) {
                let res = response.data;
                setState(prevState => ({ ...prevState, allAgeCategories: res }));
            }
        })
    }

    const getClassRoomLevel = () => {
        let command = {
            classRoomLevel_ID: 0
        }
        CoursesListService.getClassRoomLevel(command, response => {
            if (response.success) {
                let res = response.data;
                setState(prevState => ({ ...prevState, allClassRoomLevels: res }));
            }
        })
    }

    const getAllTeacherAcademyClassSubject = () => {
        let query = {
            Academy_ID: 2
        }
        let command = `Academy_ID=${query.Academy_ID}`;
        CoursesListService.getAllTeacherAcademyClassSubject(command, response => {
            if (response.success) {
                let res = response.data;
                setState(prevState => ({ ...prevState, allClassRooms: res }));
            }
        })
    }

    const submitCourse = (e) => {
        e.preventDefault();
        let weekDayData = "" ;
           if(state.saturday) weekDayData += "0" ;
           if(state.sunday) weekDayData += ";1" ;
           if(state.monday) weekDayData += ";2" ;
           if(state.tuesday) weekDayData += ";3" ; 
           if(state.wednesday) weekDayData += ";4" ;
           if(state.thursday) weekDayData += ";5" ;
           if(state.friday) weekDayData += ";6" ;
           if(weekDayData.charAt(0) === ";") weekDayData = weekDayData.substring(1)

        let command = {
            classRoom_ID: state.classRoomID,
            classRoom_ApproveAspNetUsers_Ref: state.classRoomApproveAspNetUsersRef,
            classRoom_Server_Ref: state.classRoomServerRef,
            classRoom_ClassSubject_Ref: state.classRoomClassSubjectRef,
            classRoom_AcceptAspNetUsers_Ref: state.classRoomAcceptAspNetUsersRef,
            classRoom_ClassRoomLevel_Ref: state.classRoomLevelName,
            classRoom_AgeCategory_Ref: state.ageCategoryName,
            classRoom_Subject: state.educationSubjectName,
            classRoom_Price: state.classRoomPrice,
            classRoom_Duration: state.classRoomDuration,
            classRoom_StartTime: state.classRoomStartTime,
            classRoom_NumberSessions: state.classRoomNumberSessions,
            classRoom_Quorum: state.classRoomQuorum,
            classRoom_Discount: state.classRoomDiscount,
            classRoom_ClassLink: state.classRoomClassLink,
            startDate: state.classRoomDateTime,
            last_Price: state.lastPrice,
            weekDay: weekDayData
        };

        if(command.classRoom_ID === ""){ toastr.error("لطفا فیلد کلاس را وارد کنید"); return }
        if(command.classRoom_ClassRoomLevel_Ref === ""){ toastr.error("لطفا فیلد سطح کلاس را وارد کنید"); return }
        if(command.classRoom_AgeCategory_Ref === ""){ toastr.error("لطفا فیلد گروه سنی را وارد کنید"); return }
        if(command.startDate === ""){ toastr.error("لطفا فیلد تاریخ شروع را وارد کنید"); return }
        if(command.classRoom_Subject  === ""){ toastr.error("لطفا فیلد موضوع دوره را وارد کنید"); return }
        if(command.classRoom_Duration === ""){ toastr.error("لطفا فیلد مدت زمان هر جلسه را وارد کنید"); return }
        if(command.classRoom_StartTime === ""){ toastr.error("لطفا فیلد زمان شروع کلاس را وارد کنید"); return }
        if(command.classRoom_NumberSessions === ""){ toastr.error("لطفا فیلد تعداد کل جلسات را وارد کنید"); return }
        if(command.classRoom_Quorum === ""){ toastr.error("لطفا فیلد حد نصاب شروع دوره را وارد کنید"); return }
        if(command.classRoom_Price === ""){ toastr.error("لطفا فیلد نرخ کل دوره را وارد کنید"); return }
        if(command.weekDay.length == 0 ){ toastr.error("حداقل یک روز از هفته را انتخاب کنید"); return }

        CoursesListService.classRoomInsert(command , (response) => {
            if(response.success){
                toastr.success("دوره با موفقیت ثبت شد");
            }
        });     
    }

    const handleChangeDate = (event) => {
        setState(prevState => ({ ...prevState, classRoomDateTime: event.target.formatted }));
    }

    return (
        <>
        <div className="topTxtMainWrapper">
            <p>تعریف دوره ها</p>
        </div>
        <div className="mainWrapper">    
            <Row className="profile-style p-3" >
                <Col md={12} className="p-0">
                    <Form >
                        <Row>
                             <Col md={4} xs={12} className="p-0">
                                <Form.Group as={Row}>
                                    <Form.Label column md={3} xs={12} className="p-0">
                                        کلاس    
                                    </Form.Label>
                                    <Col md={9} xs={12} className="p-0">
                                    <Select
                                        id="select-outlined"
                                        onChange={handleChange}
                                        className="select-outlined-class"
                                        name="classRoomID"
                                        input={<BootstrapInput />}>
                                       {state.allClassRooms.map(ClassRoom => (
                                        <MenuItem value={ClassRoom.classSubject_ID}>{ClassRoom.educationSubject_Name}</MenuItem>
                                        ))}
                                        </Select>
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col md={4} xs={12} className="p-0">
                                <Form.Group as={Row}>
                                    <Form.Label column md={3} xs={12} className="p-0">
                                        سطح کلاس    
                                    </Form.Label>
                                    <Col md={9} xs={12} className="p-0">
                                    <Select
                                        id="select-outlined"
                                        onChange={handleChange}
                                        className="select-outlined-class"
                                        name="classRoomLevelName"
                                        input={<BootstrapInput />}>
                                        {state.allClassRoomLevels.map(ClassRoomLevels => (
                                        <MenuItem value={ClassRoomLevels.classRoomLevel_ID} >{ClassRoomLevels.classRoomLevel_Name}</MenuItem>
                                        ))}
                                        </Select>
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col md={4} xs={12} className="p-0">
                                <Form.Group as={Row}>
                                    <Form.Label column md={3} xs={12} className="p-0">
                                        گروه سنی    
                                    </Form.Label>
                                    <Col md={9} xs={12} className="p-0">
                                    <Select
                                        id="select-outlined"
                                        onChange={handleChange}
                                        className="select-outlined-class"
                                        name="ageCategoryName"
                                        input={<BootstrapInput />}>
                                        {state.allAgeCategories.map(AgeCategories => (
                                        <MenuItem value={AgeCategories.ageCategory_ID}>{AgeCategories.ageCategory_Name}</MenuItem>
                                        ))}
                                        </Select>
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col md={4} xs={12} className="p-0">
                                <Form.Group as={Row}>
                                    <Form.Label column md={3} xs={12} className="p-0">
                                        موضوع دوره
                                    </Form.Label>
                                    <Col md={9} xs={12} className="p-0">
                                        <Form.Control
                                            type="text"
                                            name="educationSubjectName"
                                            value={state.educationSubjectName}
                                            onChange={handleChange}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col md={4} xs={12} className="p-0">
                                <Form.Group as={Row}>
                                    <Form.Label column md={3} xs={12} className="p-0">
                                        تاریخ شروع دوره 
                                    </Form.Label>
                                    <Col md={9} xs={12} className="p-0">
                                    <DateInput
                                        value={state.classRoomDateTime}
                                        defaultValue={undefined}
                                        name={'classRoomDateTime'}
                                        onChange={handleChangeDate}
                                       />
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col md={4} xs={12} className="p-0">
                                <Form.Group as={Row}>
                                    <Form.Label column md={3} xs={12} className="p-0">
                                         مدت زمان هر جلسه    
                                    </Form.Label>
                                    <Col md={9} xs={12} className="p-0">
                                    <TextField
                                        id="time"
                                        type="time"
                                        ampm={false}
                                        defaultValue={null}
                                        name="classRoomDuration"
                                        onChange={handleChange}
                                        className="timeTextField"
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col md={4} xs={12} className="p-0">
                                <Form.Group as={Row}>
                                    <Form.Label column md={3} xs={12} className="p-0">
                                        زمان شروع کلاس 
                                    </Form.Label>
                                    <Col md={9} xs={12} className="p-0">
                                    <TextField
                                        id="time"
                                        type="time"
                                        defaultValue={null}
                                        name="classRoomStartTime"
                                        className="timeTextField"
                                        onChange={handleChange}
                                    />
                                    </Col>
                                </Form.Group>
                            </Col>

                            <Col md={4} xs={12} className="p-0">
                                <Form.Group as={Row}>
                                <InputGroup>
                                    <Form.Label column md={3} xs={12} className="p-0">
                                         تعداد کل جلسات  
                                    </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="classRoomNumberSessions"
                                            value={state.classRoomNumberSessions}
                                            onChange={handleChange}
                                            className="noBorderInput"
                                        />                                       
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">(جلسه)</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    </InputGroup>
                                </Form.Group>
                            </Col>

                            <Col md={4} xs={12} className="p-0">
                                <Form.Group as={Row}>
                                <InputGroup>
                                    <Form.Label column md={3} className=" p-0">
                                            حد نصاب  شروع دوره  
                                    </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="classRoomQuorum"
                                            value={state.classRoomQuorum}
                                            onChange={handleChange}
                                            className="noBorderInput"
                                        />
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">(نفر)</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    </InputGroup>
                                </Form.Group>
                            </Col>

                            <Col md={4} xs={12} className="p-0">
                                <Form.Group as={Row}>
                                    <InputGroup>
                                    <Form.Label column md={3} xs={12} className="p-0">
                                         نرخ کل دوره  
                                    </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="classRoomPrice"
                                            value={state.classRoomPrice}
                                            onChange={handleChange}
                                            className="noBorderInput"
                                        />
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">(تومان)</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    </InputGroup>
                                </Form.Group>
                            </Col>

                            <Col md={4} xs={12} className="p-0">
                                <Form.Group as={Row}>
                                <InputGroup>
                                    <Form.Label column md={3} xs={12} className="p-0">
                                             درصد تخفیف  
                                    </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="classRoomDiscount"
                                            value={state.classRoomDiscount}
                                            onChange={handleChange}
                                            className="noBorderInput"
                                        />
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">٪</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    </InputGroup>
                                </Form.Group>
                            </Col>

                            <Col md={4} xs={12} className="p-0">
                                <Form.Group as={Row}>
                                <InputGroup>
                                    <Form.Label column md={3} xs={12} className="p-0">
                                            نرخ دوره پس از تخفیف    
                                    </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastPrice"
                                            value={state.lastPrice}
                                            onChange={handleChange}
                                            className="noBorderInput"
                                        />
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">(تومان)</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col className="mainWeekDays p-0">
                            <p className="WeekDaysText p-0 m-0"> 
                                روز های کلاس :
                            </p>
                            <div className={"wrapperWeekDays"}>
                                    <div className="wrapperSaturday">
                                        <FormControlLabel
                                            control={<GreenCheckbox checked={state.saturday} onChange={handleChangeChecked} name="saturday" />}
                                            label="شنبه"
                                        />
                                        <p className="clearView">/</p>
                                    </div>
                                    <div>
                                        <FormControlLabel
                                            control={<GreenCheckbox checked={state.sunday} onChange={handleChangeChecked} name="sunday" />}
                                            label="یکشنبه"
                                        />
                                        <p className="clearView">/</p>
                                    </div>
                                    <div>
                                        <FormControlLabel
                                            control={<GreenCheckbox checked={state.monday} onChange={handleChangeChecked} name="monday" />}
                                            label="دوشنبه"
                                        />
                                        <p className="clearView">/</p>
                                    </div>
                                    <div>
                                        <FormControlLabel
                                            control={<GreenCheckbox checked={state.tuesday} onChange={handleChangeChecked} name="tuesday" />}
                                            label="سه شنبه"
                                        />
                                        <p className="clearView">/</p>
                                    </div>
                                    <div>
                                        <FormControlLabel
                                            control={<GreenCheckbox checked={state.wednesday} onChange={handleChangeChecked} name="wednesday" />}
                                            label="چهارشنبه"
                                        />
                                        <p className="clearView">/</p>
                                    </div>
                                    <div>
                                        <FormControlLabel
                                            control={<GreenCheckbox checked={state.thursday} onChange={handleChangeChecked} name="thursday" />}
                                            label="پنجشنبه"
                                        />
                                        <p className="clearView">/</p>
                                    </div>
                                    <div className="wrapperFriday">
                                        <FormControlLabel
                                            control={<GreenCheckbox checked={state.friday} onChange={handleChangeChecked} name="friday" />}
                                            label="جمعه"
                                        />
                                        <p className="clearView" style={{visibility: "hidden"}}>/</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                    <Col md={12} className="btn-style pt-5 pr-4 mb-4">
                        <Button className="color-style ml-2" onClick={submitCourse}>تأیید</Button>
                        <Button className="color-style-cancel ml-2" >انصراف</Button>
                    </Col>
                </Col>
            </Row>
        </div>
    </>    
    )
}
export default CoursesList;
