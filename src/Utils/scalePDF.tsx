import { Document, Page, View, Text, Canvas } from "@react-pdf/renderer"
import { useContext } from "react";
import { ScaleContext } from "../Context/scale";
import { IDay } from "../@types/IScaleMonth";
import { CardDay } from "../Components/Cards/Day";
import { IsNewDay } from "../Handlers/isNewDay";


interface IScalePDF {
  days: IDay[]
}

export const ScalePDF = ({ days }: IScalePDF) => (
  <Document>
    <Page size="A4" orientation="landscape">
      <View>
        <Text>Hello</Text>
        {
          days.map((item) => {
            return <Text>{item.name}</Text>
          })
        }
      </View>
    </Page>
  </Document>
)
