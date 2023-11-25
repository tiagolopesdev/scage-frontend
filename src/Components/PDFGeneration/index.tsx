import pdfMake from "pdfmake/build/pdfmake";
import { Column, Content, TDocumentDefinitions } from "pdfmake/interfaces";
import pdfFonts from "pdfmake/build/vfs_fonts"
import { IconVerticalLogo } from "../../Assets/Icons/export-vertical-logo";
import { IconDivisionDay } from "../../Assets/Icons/division-day";

pdfMake.vfs = pdfFonts.pdfMake.vfs

const IconCamera = `<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5075 10.2487H2.51186C1.17715 10.2487 0.328649 9.45263 0.25238 8.12268L0.004505 4.19004C-0.0336296 3.59419 0.171344 3.02217 0.581291 2.58839C0.986472 2.15461 1.55849 1.90673 2.14958 1.90673C2.30212 1.90673 2.44989 1.81616 2.52139 1.67316L2.8646 0.991501C3.14585 0.433782 3.85133 0 4.46626 0H5.55787C6.17279 0 6.87351 0.433782 7.15476 0.986734L7.49797 1.68269C7.56947 1.81616 7.71247 1.90673 7.86978 1.90673C8.46087 1.90673 9.03289 2.15461 9.43807 2.58839C9.84801 3.02694 10.053 3.59419 10.0149 4.19004L9.76698 8.12745C9.68118 9.47646 8.85651 10.2487 7.5075 10.2487ZM4.46626 0.715025C4.11352 0.715025 3.66543 0.991501 3.50336 1.31088L3.16015 1.9973C2.95994 2.38342 2.57383 2.62176 2.14958 2.62176C1.74917 2.62176 1.37735 2.78383 1.10088 3.07461C0.829167 3.36538 0.690929 3.74673 0.71953 4.14238L0.967405 8.07978C1.0246 9.04268 1.54419 9.53366 2.51186 9.53366H7.5075C8.4704 9.53366 8.98999 9.04268 9.05195 8.07978L9.29983 4.14238C9.32366 3.74673 9.19019 3.36538 8.91848 3.07461C8.64201 2.78383 8.27019 2.62176 7.86978 2.62176C7.44553 2.62176 7.05942 2.38342 6.85921 2.00684L6.51123 1.31088C6.35393 0.996268 5.90585 0.719791 5.5531 0.719791H4.46626V0.715025Z" fill="#292D32"/>
<path d="M5.72488 3.57512H4.29483C4.09939 3.57512 3.93732 3.41305 3.93732 3.21761C3.93732 3.02217 4.09939 2.8601 4.29483 2.8601H5.72488C5.92032 2.8601 6.08239 3.02217 6.08239 3.21761C6.08239 3.41305 5.92032 3.57512 5.72488 3.57512Z" fill="#292D32"/>
<path d="M5.00982 8.34195C3.95635 8.34195 3.10309 7.48869 3.10309 6.43522C3.10309 5.38175 3.95635 4.52849 5.00982 4.52849C6.06329 4.52849 6.91655 5.38175 6.91655 6.43522C6.91655 7.48869 6.06329 8.34195 5.00982 8.34195ZM5.00982 5.24351C4.352 5.24351 3.81811 5.7774 3.81811 6.43522C3.81811 7.09304 4.352 7.62693 5.00982 7.62693C5.66764 7.62693 6.20153 7.09304 6.20153 6.43522C6.20153 5.7774 5.66764 5.24351 5.00982 5.24351Z" fill="#292D32"/>
</svg>`

const IconCutDesk = `<svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.2516 2.47027H7.28729C7.08473 2.47027 6.91675 2.30229 6.91675 2.09973C6.91675 1.89717 7.08473 1.72919 7.28729 1.72919H10.2516C10.4542 1.72919 10.6222 1.89717 10.6222 2.09973C10.6222 2.30229 10.4542 2.47027 10.2516 2.47027Z" fill="#292D32"/>
<path d="M2.34676 2.47027H0.370541C0.167978 2.47027 0 2.30229 0 2.09973C0 1.89717 0.167978 1.72919 0.370541 1.72919H2.34676C2.54932 1.72919 2.7173 1.89717 2.7173 2.09973C2.7173 2.30229 2.54932 2.47027 2.34676 2.47027Z" fill="#292D32"/>
<path d="M4.32294 4.19946C3.16685 4.19946 2.22321 3.25582 2.22321 2.09973C2.22321 0.943643 3.16685 0 4.32294 0C5.47902 0 6.42267 0.943643 6.42267 2.09973C6.42267 3.25582 5.47902 4.19946 4.32294 4.19946ZM4.32294 0.741081C3.57197 0.741081 2.96429 1.34877 2.96429 2.09973C2.96429 2.85069 3.57197 3.45838 4.32294 3.45838C5.0739 3.45838 5.68158 2.85069 5.68158 2.09973C5.68158 1.34877 5.0739 0.741081 4.32294 0.741081Z" fill="#292D32"/>
<path d="M10.2516 7.90487H8.27539C8.07282 7.90487 7.90485 7.73689 7.90485 7.53433C7.90485 7.33176 8.07282 7.16378 8.27539 7.16378H10.2516C10.4542 7.16378 10.6221 7.33176 10.6221 7.53433C10.6221 7.73689 10.4542 7.90487 10.2516 7.90487Z" fill="#292D32"/>
<path d="M3.33487 7.90487H0.370541C0.167978 7.90487 0 7.73689 0 7.53433C0 7.33176 0.167978 7.16378 0.370541 7.16378H3.33487C3.53743 7.16378 3.70541 7.33176 3.70541 7.53433C3.70541 7.73689 3.53743 7.90487 3.33487 7.90487Z" fill="#292D32"/>
<path d="M6.29919 9.63406C5.14311 9.63406 4.19946 8.69041 4.19946 7.53433C4.19946 6.37824 5.14311 5.4346 6.29919 5.4346C7.45528 5.4346 8.39892 6.37824 8.39892 7.53433C8.39892 8.69041 7.45528 9.63406 6.29919 9.63406ZM6.29919 6.17568C5.54823 6.17568 4.94054 6.78336 4.94054 7.53433C4.94054 8.28529 5.54823 8.89297 6.29919 8.89297C7.05016 8.89297 7.65784 8.28529 7.65784 7.53433C7.65784 6.78336 7.05016 6.17568 6.29919 6.17568Z" fill="#292D32"/>
</svg>`

const IconMonth = `<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.80542 1V3.88333" stroke="#797979" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.4946 1V3.88333" stroke="#797979" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M1.48071 7.81427H17.8196" stroke="#797979" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.3 7.24727V15.4167C18.3 18.3 16.8583 20.2223 13.4944 20.2223H5.80556C2.44167 20.2223 1 18.3 1 15.4167V7.24727C1 4.36393 2.44167 2.44171 5.80556 2.44171H13.4944C16.8583 2.44171 18.3 4.36393 18.3 7.24727Z" stroke="#797979" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.2009 12.245H13.21" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13.2009 15.1284H13.21" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.64551 12.245H9.65459" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.64551 15.1284H9.65459" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.08838 12.245H6.09744" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.08838 15.1284H6.09744" stroke="#797979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

export const PDFMakeScale = () => {

  const dayElement = (nameEvent: string, dateTimeEvent: string, cameraOne: string,
    cameraTwo: string, cutDesk: string): Content => {
    return {
      table: {
        body: [
          [
            {
              table: {
                body: [
                  [
                    {
                      svg: IconMonth,
                      width: 25, margin: [0, 5, 0, 0], alignment: 'center'
                    },
                    {
                      table: {
                        body: [
                          [{ text: `${nameEvent}`, style: 'eventName' }],
                          [{ text: `${dateTimeEvent}`, style: 'eventInformation' }]
                        ]
                      },
                      layout: 'noBorders'
                    }
                  ],
                ],
              },
              layout: 'noBorders'
            }
          ],
          [
            {
              table: {
                body: [
                  [
                    { svg: IconCamera, width: 10, margin: [10, 2, 0, 0] },
                    { text: `${cameraOne}`, style: 'collaboratorName' }
                  ],
                  [
                    { svg: IconCamera, width: 10, margin: [10, 2, 0, 0] },
                    { text: `${cameraTwo}`, style: 'collaboratorName' }
                  ],
                  [
                    { svg: IconCutDesk, width: 10, margin: [10, 2, 0, 0] },
                    { text: `${cutDesk}`, style: 'collaboratorName' }
                  ]
                ],
              },
              layout: 'noBorders',
            }
          ]
        ]
      },
      layout: 'noBorders'
    }
  }

  const printPdf = async (data: Column[]) => {

    const contentFlex: Content[] = []
    let column: Column[] = []
    let maxLengthRow = 4

    data.map((item, index) => {

      column.push(dayElement(
        'Missa dominical',
        '00/00/0000 às 00:00',
        'Chico golçalves',
        'Tiago Lopes',
        'João Silva')
      )

      if (index === (maxLengthRow - 1) || index === data.length - 1) {
        contentFlex.push({ columns: column })

        if (contentFlex.length > 1) {
          contentFlex.splice(
            (contentFlex.length - 1),
            0,
            {
              svg: IconDivisionDay,
              margin: [5, 10, 5, 5],
              alignment: 'center'
            }
          )
        }
        column = []
        maxLengthRow += 4
      }
    })

    contentFlex.splice(0, 0, '\n')

    var docDefinition: TDocumentDefinitions = {
      pageOrientation: "landscape",
      header: {
        text: 'Escala referente aos festejos de São Sebastião',
        style: 'scaleName',
        alignment: 'center'
      },
      content: [ contentFlex ],
      footer: {
        svg: IconVerticalLogo,
        width: 100,
        marginTop: 10,
        alignment: 'center'
      },
      styles: {
        header: {
          bold: true,
          alignment: 'center',
        },
        scaleName: {
          fontSize: 18,
          bold: true,
          color: '#0966BB',
          margin: [0, 10, 20, 0]
        },
        collaboratorName: {
          fontSize: 14,
          bold: true,
          color: '#0966BB',
        },
        eventInformation: {
          fontSize: 10,
          bold: false,
          color: '#4D4E4D',
        },
        eventName: {
          fontSize: 16,
          bold: true,
          color: '#4D4E4D',
        },
        bigger: {
          fontSize: 15,
          italics: true,
        }
      }
    }

    pdfMake.createPdf(docDefinition).open({}, window)
  }

  return (
    <button onClick={() => {
      printPdf([
        {
          width: 180,
          text: '1 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam.',
          style: 'fontFamily'
        },
        {
          width: 180,
          text: '2 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam.'
        },
        {
          width: 180,
          text: '3 - fhsdjfhsdjfhueifslhfsdjkfhsjkfhasjklfhskjahfklafhoifghurfvsjk.fneforheguiahflçhgfuirehgçolaçshadfulherghhgdfhglfhkvgvjvsfnjfhurhuiruhruhirghu'
        },
        {
          width: 180,
          text: '4 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam.'
        },
        {
          width: 180,
          text: '5 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam.'
        },
        {
          width: 180,
          text: '6 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam.'
        },
        {
          width: 180,
          text: '7 - fhsdjfhsdjfhueifslhfsdjkfhsjkfhasjklfhskjahfklafhoifghurfvsjk.fneforheguiahflçhgfuirehgçolaçshadfulherghhgdfhglfhkvgvjvsfnjfhurhuiruhruhirghu'
        },
        {
          width: 180,
          text: '8 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam.'
        },
        {
          width: 180,
          text: '5 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam.'
        },
        {
          width: 180,
          text: '6 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam.'
        },
        {
          width: 180,
          text: '7 - fhsdjfhsdjfhueifslhfsdjkfhsjkfhasjklfhskjahfklafhoifghurfvsjk.fneforheguiahflçhgfuirehgçolaçshadfulherghhgdfhglfhkvgvjvsfnjfhurhuiruhruhirghu'
        },
        {
          width: 180,
          text: '5 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam.'
        },
        {
          width: 180,
          text: '6 - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam.'
        },
        {
          width: 180,
          text: '7 - fhsdjfhsdjfhueifslhfsdjkfhsjkfhasjklfhskjahfklafhoifghurfvsjk.fneforheguiahflçhgfuirehgçolaçshadfulherghhgdfhglfhkvgvjvsfnjfhurhuiruhruhirghu'
        }
      ])
    }}>download</button>
  )
}