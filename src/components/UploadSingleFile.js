import isString from "lodash/isString"
import { useDropzone } from "react-dropzone";
import {styled} from "@mui/material/styles";
import {Box,Stack,Typography} from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import RejectionFiles from "./RejectionFiles";


const DropzoneStyle=styled("div")(({theme})=>({
    outline:"none",
    overflow:"hidden",
    position:"relative",
    height:200,
    padding:theme.spacing(3,1),
    borderRadius:theme.shape.borderRadius,
    transition:theme.transitions.create("padding"),
    backgroundColor:"#F4F6F8",
    border:"1px dashed alpha('#919EAB',0.32) ",
   "&:hover":{opacity:0.72,cursor:"pointer"},

}))
const PlaceholderStyle=styled("div")(({theme})=>({
    display:"flex",
    position:"absolute",
    alignItems:"center",
    flexDirection:"column",
    justifyContent:"center",    
    color:"#919EAB",
    backgroundColor:"#919EAB",
    transition:theme.transitions.create("opacity",{
        easing:theme.transitions.easing.easeInOut,
        duration:theme.transitions.duration.shorter,
    }),
    "&:hover":{ opacity: 0.72 }

}));
function UploadSingleFile({error=false,file,helperText,sx,...other}){
    const{
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections
    }=useDropzone({
        multiple:false,
        ...other
    });
    return (
        <Box sx={{width:"100%",...other}}>
            <DropzoneStyle
                {...getRootProps()}
                sx={{
                    ...(isDragActive&&{opacity:0.72}),
                    ...((isDragReject||error)&&{
                        color:"error.main",
                        borderColor:"error.light",
                        bgcolor:"error.lighter"
                    }),
                    ...(file&&{
                        padding:"5% 0",
                    })
                }}
                >
                    <input {...getInputProps()}/>
                    <Stack
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                    sx={{height:"100%"}}
                    >
                        <AddAPhotoIcon/>
                        <Typography
                        gutterBottom
                        variant="body2"
                        textAlign="center"
                        sx={{color:"#637381"}}>
                            Drop or Select Image
                        </Typography>
                    </Stack>
                    {file&&(
                        <Box
                        sx={{
                            top:8,
                            left:8,
                            borderRadius:1,
                            position:"absolute",
                            width:"calc(100%-16px)",
                            height:"calc(100%-16px)",
                            overflow:"hidden",
                            "& img":{objectFit:"cover",width:1,height:1},
                        }}
                        >
                            <img
                            alt="file priview"
                            src={isString(file)?file:file.preview}/>
                        </Box>
                    )}
                    
            </DropzoneStyle>
            {fileRejections.length>0 && (
                <RejectionFiles fileRejections={fileRejections} />
            )}
            {helperText&& helperText}

        </Box>
    )
}
export default UploadSingleFile;