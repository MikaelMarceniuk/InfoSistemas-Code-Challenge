import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react"
import { ICarro } from "../../types"
import styled from "@emotion/styled"

interface IProps extends ICarro {
  onClickHandler: (carroId: string) => void
}

const StyledCard = styled(Card)({
  width: 300,

  alignSelf: "center",

  cursor: "pointer",

  ":hover": {
    backgroundColor: "#ddd",
  },

  ":active": {
    backgroundColor: "#fff",
  },
})

const CarroListItem: React.FC<IProps> = ({ onClickHandler, ...carro }) => {
  return (
    <StyledCard onClick={() => onClickHandler(carro._id)}>
      <CardHeader>
        <Heading size="sm">
          {carro.marca} - {carro.modelo}
        </Heading>

        <CardBody>
          <Text>Ano: {carro.ano}</Text>
          <Text>Chassi: {carro.chassi}</Text>
          <Text>Placa: {carro.placa}</Text>
          <Text>Renavam: {carro.renavam}</Text>
        </CardBody>
      </CardHeader>
    </StyledCard>
  )
}

export default CarroListItem
