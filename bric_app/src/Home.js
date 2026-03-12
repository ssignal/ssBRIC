import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// mui components
import { 
	Box, 
	Button, 
	ButtonBase, 
	Container, 
	Dialog, 
	DialogActions, 
	DialogContent, 
	DialogContentText, 
	DialogTitle,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography 
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { styled } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// images
import startFromEmpty from './assets/images/startFromEmpty.jpg';
import startFromSaved from './assets/images/startFromSaved.jpg';

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  display: 'block',
	width: '25vh',
  height: '25vh',	
  '& .imageTitle': {
    position: 'relative',
    padding: `${theme.spacing(20)} ${theme.spacing(0)} 0px`,
  }
}));

// const robotPortHttp = 8006;
const robotPortHttps = 8007;

export default function Home() {

	const navigate = useNavigate();
	
	const [robotName, setRobotName] = useState('');
	const [robotIP, setRobotIP] = useState('');
	const [robotList, setRobotList] = useState(null);
	const [robotNameForSave, setRobotNameForSave] = useState('');
	const [robotIPForSave, setRobotIPForSave] = useState('');
	const [openAddRobotInput, setOpenAddRobotInput] = useState(false);
	const [savedWSList, setSavedWSList] = useState(null);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [workspaceToDelete, setWorkspaceToDelete] = useState(null);
	const [openSaveSuccess, setOpenSaveSuccess] = useState(false);
	const [openDeleteSuccess, setOpenDeleteSuccess] = useState(false);
	const [openDeleteWSSuccess, setOpenDeleteWSSuccess] = useState(false);

	const [isVerifiedOtp, setIsVerifiedOtp] = useState(false);
	const [otpNumber, setOtpNumber] = useState('');
	

	useEffect(() => {
		// console.log('local storage:', Object.keys(window.localStorage));
		const storedObject = window.localStorage;
		const wsList = Object.keys(storedObject).filter((value, index, arr) => {			
			return value !== 'robotList';
		})
		console.log('workspace list:', wsList);
		if (wsList){
			setSavedWSList(wsList);
		}		
		if (storedObject.robotList) {			
			const robotsObj = JSON.parse(window.localStorage?.getItem('robotList'));
			const robots = Object.keys(robotsObj);
			console.log('robot list:', robots);
			setRobotList(robots);
			setRobotName(robotsObj[robots[0]].name);
			setRobotIP(robotsObj[robots[0]].ip);
		}
  }, [])

	useEffect(() => {
		if(robotName === '') return;
		console.log('selected robot:', robotName);
		handleCloseSave();
  }, [robotName])

	useEffect(() => {
		if(robotIP === '') return;
		console.log('selected robotIP:', robotIP);
  }, [robotIP])

	const handleRobotChange = (event) => {    
		const robotName = event.target.value;
		const robotListObj = JSON.parse(window.localStorage?.getItem('robotList'));
		setRobotName(robotListObj[robotName].name);
		setRobotIP(robotListObj[robotName].ip);
  };

	const handleClickDelete = (ws) => {
    console.info('delete saved workspace:', ws);		
		setOpenDeleteDialog(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteDialog(false);
		setWorkspaceToDelete(null);
  }

	const handleAddRobot = () => {
		setRobotNameForSave('');
		setRobotIPForSave('');
		setOpenAddRobotInput(!openAddRobotInput);
	}

	const handleSaveRobot = (e) => {			
		e.preventDefault();
		console.log('new robot to save:', robotNameForSave);
		const storedObjects = window.localStorage;
		if (storedObjects.robotList) {			
			const robotsObj = JSON.parse(window.localStorage?.getItem('robotList'));
			const robots = Object.keys(robotsObj);
			if(!(robotNameForSave in robots)){				
				robotsObj[robotNameForSave] = {
					name: robotNameForSave,
					ip: robotIPForSave
				}
				window.localStorage?.setItem('robotList', JSON.stringify(robotsObj));
			}
		} else {
			const robotsObj = {};
			robotsObj[robotNameForSave] = {
				name: robotNameForSave,
				ip: robotIPForSave
			}
			window.localStorage?.setItem('robotList', JSON.stringify(robotsObj));
		}
		setOpenSaveSuccess(true);

		const newRobotsObj = JSON.parse(window.localStorage?.getItem('robotList'));
		const newRobots = Object.keys(newRobotsObj);
		console.log('new robot list:', newRobots);
		setRobotList(newRobots);
		setRobotName(newRobotsObj[newRobots[0]].name);
		setRobotIP(newRobotsObj[newRobots[0]].ip);
		setRobotNameForSave('');
		setRobotIPForSave('');
		setOpenAddRobotInput(false);	
	}

	const handleCloseSave = () => {
		setRobotNameForSave('');
		setRobotIPForSave('');
		setOpenAddRobotInput(false);
	}

	const handleDeleteRobot = () => {
		console.log('delete robot:', robotName);
		const robotsObj = JSON.parse(window.localStorage?.getItem('robotList'));
		delete robotsObj[robotName];
		setOpenDeleteSuccess(true);
		if(Object.keys(robotsObj).length !== 0) {
			window.localStorage?.setItem('robotList', JSON.stringify(robotsObj));
			const newRobotsObj = JSON.parse(window.localStorage?.getItem('robotList'));
			const newRobots = Object.keys(newRobotsObj);
			console.log('new robot list:', newRobots);
			setRobotList(newRobots);
			setRobotName(newRobotsObj[newRobots[0]].name);
			setRobotIP(newRobotsObj[newRobots[0]].ip);			
		}
		else {
			window.localStorage.removeItem('robotList');
			console.log('robot list is empty');
			setRobotList(null);
			setRobotName('');
			setRobotIP('');
		}
		
		handleCloseSave();		
	}

	const handleCloseSaveSuccess = () => {
		setOpenSaveSuccess(false);
	}

	const handleCloseDeleteSuccess = () => {
		setOpenDeleteSuccess(false);
	}

	const handleCloseDeleteWSSuccess = () => {
		setOpenDeleteWSSuccess(false);
	}

	// const handleVerifyOtp = async(e) => {			
	// 	e.preventDefault();
	// 	let response;
	// 	let url = 'http://' + robotIP + ':' + robotPortHttp + '/api/otp/otpChecker';
	// 	console.log('request for checking otp:', url);		

	// 	try {
	// 		const otp = {
	// 			otpNumber : otpNumber,
	// 		}
	// 		response = await axios({
	// 			method: "post",
	// 			url: url,
	// 			headers: {
	// 				"Cache-Control": "no-cache",
	// 				"Content-Type": "application/json",
	// 				// "Access-Control-Allow-Origin": "*",
	// 			},
	// 			data: otp,
	// 			responseType: "json",
	// 		});
	// 	} catch (error) {
	// 		console.log('Error while checking otp', error);
	// 	}    
		
	// 	console.log('response from bric bridge:',response.data.message);		
	// 	if(response.data.message === "success") setIsVerifiedOtp(true);
	// }

	// const handleGenerateOtp = async() => {					
	// 	let response;
	// 	let url = 'http://' + robotIP + ':' + robotPortHttp + '/api/otp';
	// 	console.log('request for generating otp:', url);

	// 	try {
	// 		response = await axios({
	// 			method: "get",
	// 			url: url,
	// 			headers: {
	// 				"Cache-Control": "no-cache",
	// 				"Content-Type": "application/json",
	// 				// "Access-Control-Allow-Origin": "*",
	// 			},
	// 			responseType: "json",
	// 		});
	// 	} catch (error) {
	// 		console.log('Error while generating otp', error);
	// 	}    
		
	// 	console.log('response from bric bridge:', JSON.parse(response.data.message));
	// }

	const handleDownloadCert = async(e) => {
		e.preventDefault();
		let response;
		let url = 'https://' + robotIP + ':' + robotPortHttps + '/download-cert';
		console.log('request for downloading server certificate:', url);

		try {
			response = await axios({
				method: "get",
				url: url,
				responseType: "blob",
			});
			console.log('response from bric bridge:', response);
			const fileObjectUrl = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = fileObjectUrl;
			link.style.display = "none";
			link.setAttribute('download', 'emulserverss.crt');
			document.body.appendChild(link);
	    link.click();
  	  link.remove();
			window.URL.revokeObjectURL(fileObjectUrl);
		} catch (error) {
			console.log('Error while downloading server certificate', error);
		}    
	}

	const handleVerifyOtpHttps = async(e) => {			
		e.preventDefault();
		let response;
		let url = 'https://' + robotIP + ':' + robotPortHttps + '/api/otp/otpChecker';
		console.log('request for checking otp:', url);		

		try {
			const otp = {
				otpNumber : otpNumber,
			}
			response = await axios({
				method: "post",
				url: url,
				headers: {
					"Cache-Control": "no-cache",
					"Content-Type": "application/json",
					// "Access-Control-Allow-Origin": "*",
				},
				data: otp,
				responseType: "json",	
			});
		} catch (error) {
			console.log('Error while checking otp', error);
		}    
		
		console.log('response from bric bridge:',response.data.message);		
		if(response.data.message === "success") setIsVerifiedOtp(true);
	}

	const handleGenerateOtpHttps = async() => {					
		let response;
		let url = 'https://' + robotIP + ':' + robotPortHttps + '/api/otp';
		console.log('request for generating otp:', url);

		try {
			response = await axios({
				method: "get",
				url: url,
				headers: {
					"Cache-Control": "no-cache",
					"Content-Type": "application/json",
					// "Access-Control-Allow-Origin": "*",
				},
				responseType: "json",
			});
		} catch (error) {
			console.log('Error while generating otp', error);
		}    
		
		console.log('response from bric bridge:', JSON.parse(response.data.message));
	}

  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>			
			<Typography variant="h2" fontSize="1.5rem" align="left">
				Q9 Visual Programming Editor
			</Typography>			
			<Box sx={{ ml: 3, mt:5, minWidth: 120 }}>
				
			</Box>			
			<Box sx={{ ml: 1, mt:5, minWidth: 120 }}>
			{robotList &&
				<>
					<FormControl sx={{ width: '25ch' }}>
						<InputLabel id="select-label">Robot</InputLabel>
						<Select
							labelId="select-robot"
							id="select-robot"
							value={robotName}
							label="Robot"
							onChange={handleRobotChange}
						>
						{robotList.map((robot) => (
							<MenuItem key={robot} value={robot}>{robot}</MenuItem>
						))}
						</Select>
						<Typography	variant="caption"	style={{ color: 'gray', marginLeft: '1.2em'}}>
							{robotIP}
						</Typography>
					</FormControl>					
					<Button
						variant="outlined"
						onClick={handleDeleteRobot}
						startIcon={<DeleteForeverIcon />}
						sx={{ ml: 3, mt: 1, width: '20ch', fontSize: '12px' }}
					>
						Delete
					</Button>	
				</>
			}
				<Button
					variant="outlined"
					onClick={() => handleAddRobot()}
					startIcon={<AddIcon sx={{ fontSize: 30 }}/>}
					sx={{ ml: 3, mt: 1,  width: '20ch', fontSize: '12px' }}
				>
					Add Robot
				</Button> 
			</Box>
			{openAddRobotInput &&
				<>
				<Box
					component="form"
					sx={{
						'& .MuiTextField-root': { m: 1, width: '25ch' },
					}}
					onSubmit={handleSaveRobot}
				>
					<div>
						<TextField required label="robot name" 
							onChange={(e) => {
								setRobotNameForSave(e.target.value);
						}}/>
						<TextField required label="robot ip" 
							onChange={(e) => {
								setRobotIPForSave(e.target.value);
						}}/>
						<Button
							variant="outlined"
							type="submit"							
							sx={{ ml: 3, mt: 2, width: '20ch', fontSize: '12px' }}
						>
							Save
						</Button>	
						<Button
							variant="outlined"
							onClick={handleCloseSave}
							sx={{ ml: 3, mt: 2,  width: '20ch', fontSize: '12px' }}
						>
							Close
						</Button>	
					</div>						
				</Box>					 
				</>
			}
			{ /*
			<Box
				component="form"
				sx={{
					'& .MuiTextField-root': { ml: 1, mt: 1, mb: 1, width: '25ch' },
				}}
				onSubmit={handleVerifyOtp}
			>
				<div>
					<TextField 
						required 
						disabled={isVerifiedOtp}
						label="otp number" 
						onChange={(e) => {
							setOtpNumber(e.target.value);
					}}/>
					<Button
						variant="outlined"
						disabled={isVerifiedOtp}
						type="submit"						
						sx={{ ml: 3, mt: 2, width: '20ch', fontSize: '12px' }}
					>
						Verify OTP
					</Button>	
					<Button
						variant="outlined"
						disabled={isVerifiedOtp}
						onClick={handleGenerateOtp}
						sx={{ ml: 3, mt: 2,  width: '20ch', fontSize: '12px' }}
					>
						Generate OTP
					</Button>	
					{isVerifiedOtp &&
						<Typography
							variant="subtitle1"
							color="red"
							className="imageTitle"
						>
							Connection to robot has been authenticated.
						</Typography>
					}
				</div>						
				</Box>	
			*/ }			 
			<Box
				component="form"
				sx={{
					'& .MuiTextField-root': { ml: 1, mt: 1, mb: 1, width: '25ch' },
				}}
				onSubmit={handleDownloadCert}
			>
				<Button
					variant="outlined"
					type="submit"						
					sx={{ ml: 3, mt: 2, width: '20ch', fontSize: '12px' }}
				>
					Download Server Certificate
				</Button>					
			</Box>			
			
			<Box
				component="form"
				sx={{
					'& .MuiTextField-root': { ml: 1, mt: 1, mb: 1, width: '25ch' },
				}}
				onSubmit={handleVerifyOtpHttps}
			>
				<div>
					<TextField 
						required 
						disabled={isVerifiedOtp}
						label="otp number" 
						onChange={(e) => {
							setOtpNumber(e.target.value);
					}}/>
					<Button
						variant="outlined"
						disabled={isVerifiedOtp}
						type="submit"						
						sx={{ ml: 3, mt: 2, width: '20ch', fontSize: '12px' }}
					>
						Verify OTP
					</Button>	
					<Button
						variant="outlined"
						disabled={isVerifiedOtp}
						onClick={handleGenerateOtpHttps}
						sx={{ ml: 3, mt: 2,  width: '20ch', fontSize: '12px' }}
					>
						Generate OTP
					</Button>	
					{isVerifiedOtp &&
						<Typography
							variant="subtitle1"
							color="red"
							className="imageTitle"
						>
							Connection to robot has been authenticated.
						</Typography>
					}
				</div>						
			</Box>	
			
			<Box
				sx={{
					'& .MuiTextField-root': { ml: 1, mt: 1, mb: 1, width: '25ch' },
				}}
			>
				<Button
					variant="outlined"
					onClick={() => navigate('/WSTester', { state: { robotName: robotName, robotIP: robotIP } })}						
					sx={{ ml: 3, mt: 2, width: '20ch', fontSize: '12px' }}
				>
					Websocket Tester
				</Button>					
			</Box>
      <Box sx={{ mt: 5, display: 'flex', flexWrap: 'wrap' }}>
				<Box 
					key="new" 
					sx={{ 
						m: 1, 
						p: 1, 
						width: '30vh',
						height: '30vh',						
						border: '1px solid currentColor', 
						borderColor: 'lightgray'
					}}>
					<Box
						sx={{
							mb: 2,
							display: 'flex',
							justifyContent: 'center',
							color: 'common.black',
						}}
					>
						<Typography
							variant="subtitle1"
							color="inherit"
							className="imageTitle"
						>
							+ Create New Block
						</Typography>
					</Box>	
					<ImageIconButton					
						style={{width: '100%'}}
						onClick={() => navigate('/App', { state: { robotName: robotName, robotIP: robotIP } })}
					>
						<Box
							sx={{
								position: 'absolute',
								left: 0,
								right: 0,
								top: 0,
								bottom: 0,
								backgroundSize: 'cover',
								backgroundPosition: 'center 40%',
								backgroundImage: `url(${startFromEmpty})`,		
							}}
						/>									
					</ImageIconButton>		
				</Box>
				{savedWSList &&
					savedWSList.map((ws) => (
					<Box 
						key={ws} 
						sx={{ 
							m: 1, 
							p: 1, 
							width: '30vh',
							height: '30vh',
							border: '1px solid currentColor',
							borderColor: 'lightgray'
						}}>			
						<IconButton 							
							aria-label="delete" 
							onClick={() => {
								setWorkspaceToDelete(ws);
								handleClickDelete();
							}}		
							sx={{ 
								display: 'flex',									
								p:0							
						}}>
							<HighlightOffOutlinedIcon								
								sx={{ 								
									position: 'absolute',
									left: 0,
									right: 0,
									top: 0,
									bottom: 0,	
									fontSize: 'large'
							}}/>
						</IconButton>		
						<Box
							sx={{
								mb: 2,
								display: 'flex',
								justifyContent: 'center',
								color: 'common.black',
							}}
						>
							<Typography
								variant="subtitle1"
								color="inherit"
								className="imageTitle"
							>
							Edit
							</Typography>
							<Typography
								variant="subtitle1"
								color="secondary"
								className="imageTitle"
								sx={{ml: 1}}
							>
							{`${ws}`}
							</Typography>									
						</Box>								
						<ImageIconButton
							style={{width: '100%'}}
							onClick={() => navigate('/App',  { state: { savedWorkspace: ws, robotName: robotName, robotIP: robotIP } })}							
						>						
							<Box
								sx={{
									position: 'absolute',
									left: 0,
									right: 0,
									top: 0,
									bottom: 0,
									backgroundSize: 'cover',
									backgroundPosition: 'bottom',
									backgroundImage: `url(${startFromSaved})`,
								}}
							/>
						</ImageIconButton>									
					</Box>
				))}
      </Box>
			<Dialog
        open={openDeleteDialog}
        onClose={handleCloseDelete}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            console.log('delete workspace:', workspaceToDelete);		
						window.localStorage.removeItem(workspaceToDelete);
						setOpenDeleteWSSuccess(true);

						const storedObject = window.localStorage;				
						const wsList = Object.keys(storedObject).filter((value, index, arr) => {			
							return value !== 'robotList';
						})
						console.log('new workspace list:', wsList);
						wsList ? setSavedWSList(wsList) : setSavedWSList(null);

            handleCloseDelete();
          },
        }}
      >
        <DialogTitle>Delete Saved Workspace</DialogTitle>
        <DialogContent>
          <DialogContentText>
						{`Are you sure you want to delete workspace ${workspaceToDelete}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button type="submit">Delete</Button>
        </DialogActions>
      </Dialog>
			<Snackbar
				open={openSaveSuccess}
				autoHideDuration={6000}
				onClose={handleCloseSaveSuccess}
				message="Robot Saved Successfully"
			/>
			<Snackbar
				open={openDeleteSuccess}
				autoHideDuration={6000}
				onClose={handleCloseDeleteSuccess}
				message="Robot Deleted Successfully"
			/>
			<Snackbar
				open={openDeleteWSSuccess}
				autoHideDuration={6000}
				onClose={handleCloseDeleteWSSuccess}
				message="Workspace Deleted Successfully"
			/>
    </Container>
  );
}
