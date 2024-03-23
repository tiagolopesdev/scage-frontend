// import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Badge, Button, TextField } from "@mui/material"
// import { InformationSerfContainerStyle, InformationSerfGroupStyle } from "../../Users/Serving/style"
// import { Icon } from "../../Img"
// import { TextBaseStyle } from "../../../Styles"
// import { AlignGroupStyle } from "./style"
// import { TimePicker } from "@mui/x-date-pickers"
// import { IDay } from "../../../@types/IScaleMonth"
// import { useContext, useEffect, useState } from "react"
// import { IYoutube } from "../../../@types/Youtube/IYoutube"
// import { ObjectIsEquals } from "../../../Utils/objectIsEquals"
// import { FileUploaded } from "../../Upload/file-list"
// import { UploadFile } from "../../Upload/file-upload"
// import { PrivacyEnumLive, PrivacyEnumLiveOptions } from "../../../@types/Youtube/PrivacyEnumLive"
// import { ScaleContext } from "../../../Context/scale"
// import { InitialStateThumbnaisl } from "../../../@types/Youtube/InitialStateThumbnails"

// import IconExpand from '../../../Assets/icon_arrow.svg';
// import IconUser from '../../../Assets/icon_user.svg';
// import dayjs from "dayjs"
// import { initialStateDay } from "../../../@types/InitialStateDay"
// import { IThumbnails } from "../../../@types/Youtube/Thumbnails"


// const InitialStateLiveStream = {
//   dateTime: '',
//   descrition: '',
//   title: '',
//   privacy: PrivacyEnumLive.Public
// }

// interface ILiveStreamsAccordion {
//   day: IDay
// }

// export const LiveStreamsAccordion = ({ day }: ILiveStreamsAccordion) => {

//   const { thumbnails } = useContext(ScaleContext);

//   const [liveStream, setLiveStream] = useState<IYoutube>(InitialStateLiveStream)
//   const [expanded, setExpanded] = useState<string | false>(false);

//   const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   console.log('Inside accordion ', day)

//   const managerFileUploaded = () => <UploadFile day={day} />
//   // const managerFileUploaded = () => ObjectIsEquals(thumbnails, InitialStateThumbnaisl) ?
//   //   <FileUploaded day={day} /> :
//   //   <UploadFile day={day} />

//   // useEffect(() => { managerFileUploaded() }, [thumbnails])

//   return <Accordion
//     expanded={expanded === `panel-${day.id}`}
//     onChange={handleChange(`panel-${day.id}`)}
//     style={{ borderRadius: '5px', margin: '5px' }}
//     key={day.id}
//   >
//     <AccordionSummary
//       expandIcon={<Icon src={String(IconExpand)} />}
//       aria-controls={`panel-index-${day.id}-content`}
//       id={`panelindexbh-${day.id}-header`}
//     >
//       <InformationSerfContainerStyle>
//         <Icon src={String(IconUser)} style={{ marginRight: '10px' }} />
//         <InformationSerfGroupStyle>
//           <TextBaseStyle fontSize={16} color='black' isBold={true}>
//             {day.name}
//           </TextBaseStyle>
//           <TextBaseStyle fontSize={12} color='black'>
//             {`${dayjs(day.dateTime).format('DD/MM/YYYY')} às ${dayjs(day.dateTime).format('HH:mm')}`}
//           </TextBaseStyle>
//         </InformationSerfGroupStyle>
//       </InformationSerfContainerStyle>
//       {
//         day.liveStreamId !== undefined && day.liveStreamId !== '' ?
//           "" :
//           <Badge
//             badgeContent='Live não criada'
//             color='success'
//             anchorOrigin={{
//               vertical: 'bottom',
//               horizontal: 'left'
//             }}
//             sx={{ width: 100, margin: '0px 10px' }}
//           />
//       }
//     </AccordionSummary>
//     <AccordionDetails style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
//       <AlignGroupStyle>
//         <TextField
//           style={{ minWidth: '40%', width: '100%', marginRight: '10px' }}
//           label='Título *'
//           value={liveStream.title}
//           onChange={(event: any) => {
//             setLiveStream({ ...liveStream, title: event.target.value as string })
//           }}
//         />
//         <TimePicker
//           label="Hora do evento"
//           value={liveStream.dateTime}
//           onChange={(event) => {
//             setLiveStream({ ...liveStream, dateTime: event as string })
//           }}
//           renderInput={(params) =>
//             <TextField
//               style={{ width: '250px' }}
//               {...params}
//               error={false}
//             />
//           }
//         />
//       </AlignGroupStyle>
//       <TextField
//         rows={3}
//         // maxRows={4}
//         multiline
//         style={{ width: '32vw' }}
//         label='Descrição da live'
//         value={liveStream.descrition}
//         onChange={(event: any) => {
//           setLiveStream({ ...liveStream, descrition: event.target.value as string })
//         }}
//       />
//       <AlignGroupStyle>
//         <Autocomplete
//           disablePortal
//           sx={{ minWidth: 170, marginRight: '10px' }}
//           id="combo-box-demo-two"
//           options={PrivacyEnumLiveOptions}
//           // value={{ label: day.day }}
//           isOptionEqualToValue={(option, value) => value.label === option.label}
//           renderInput={(params) => <TextField {...params} label="Privacidade" />}
//           onChange={(event: any) => {
//             setLiveStream({ ...liveStream, privacy: PrivacyEnumLive[event.target.innerText as keyof typeof PrivacyEnumLive] })
//           }}
//         />
//         {managerFileUploaded()}
//       </AlignGroupStyle>
//       <Button
//         variant="contained"
//         disabled={ObjectIsEquals(liveStream, InitialStateLiveStream) || liveStream.title === ''}
//         size='small'
//         color='success'
//         fullWidth
//         onClick={() => { }}
//       >Salvar</Button>
//     </AccordionDetails>
//   </Accordion>
// }
