import dayjs from "dayjs";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts"
import { Column, Content, TDocumentDefinitions } from "pdfmake/interfaces";
import { IDay, IScaleMonth } from "../@types/IScaleMonth";

import { IconDivisionDay } from "../Assets/Icons/division-day";
import { IconMonth } from "../Assets/Icons/month";
import { IconCamera } from "../Assets/Icons/camera-day";
import { IconCutDesk } from "../Assets/Icons/cut-desk-day";
import { IconHorizontalPascom } from "../Assets/Icons/horizontal-logo";

pdfMake.vfs = pdfFonts.pdfMake.vfs

function dayElement(nameEvent: string, dateTimeEvent: string, cameraOne: string, cameraTwo: string, cutDesk: string): Content {
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

export function downloadPDF(data: IScaleMonth) {

  const contentFlex: Content[] = []
  let column: Column[] = []
  let maxLengthRow = 4

  data.days.map((item: IDay, index: number) => {

    column.push(dayElement(
      item.name,
      `${dayjs(item.dateTime).format('DD/MM/YYYY')} às ${dayjs(item.dateTime).format('HH:mm A')}`,
      item.cameraOne?.name as string,
      item.cameraTwo?.name as string,
      item.cutDesk?.name as string)
    )

    if (index === (maxLengthRow - 1) || index === data.days.length - 1) {

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
      text: `${data.name} - ${dayjs(data.start).format('DD/MM/YYYY')} à ${dayjs(data.end).format('DD/MM/YYYY')}`,
      style: 'scaleName',
      alignment: 'center'
    },
    content: [contentFlex],
    footer: {
      svg: IconHorizontalPascom,
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
    },
    info: {
      title: `${data.name} - ${dayjs(data.start).format('DD/MM/YYYY')} à ${dayjs(data.end).format('DD/MM/YYYY')}`
    }
  }

  pdfMake.createPdf(docDefinition).download(`${data.name} - ${dayjs(data.start).format('DD/MM/YYYY')} à ${dayjs(data.end).format('DD/MM/YYYY')}`)
}