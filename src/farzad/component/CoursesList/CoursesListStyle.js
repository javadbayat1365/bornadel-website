import { makeStyles } from '@material-ui/core/styles';

const CoursesListStyle = makeStyles((theme) => ({

dropdownDiplomaAcademy: {
    backgroundImage:
        "linear-gradient(45deg, transparent 50%, white 50%),linear-gradient(135deg, white 50%, transparent 50%),linear-gradient(to right, #33d698, #33d698)",
    backgroundPosition: "calc(100% - 13px) calc(1em + 0px),calc(100% - 8px) calc(1em + 0px),100% 0",
    backgroundSize: "5px 5px, 5px 5px, 2.5em 2.5em",
    backgroundRepeat: "no-repeat",
    appearance: "none",
    borderRadius: 4,
    border: "1px solid #d4d4d4",
    paddingLeft: 40,
    width: "100%",
    "&:focus": {
        outline: 0,
    },
},

AcademyPanelProfileDetailText: {
    fontSize: 11,
    minWidth: 72,
    textAlign: "center",
},

AcademyPanelDetailContainer: {
    display: "flex",
    marginBottom: 8,
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column"
    }
},

}));
export default CoursesListStyle
