import { Box, Button, Flex, Text } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import { carroService } from "../../service"
import { ICarro } from "../../types"
import CarroListItem from "../carroListItem"
import CarroModal from "../carroModal"

const HeaderContainer = styled(Flex)({
  width: "100%",
  padding: "16px",

  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",

  textAlign: "center",
})

const ListContainer = styled(Flex)({
  flexDirection: "column",

  gap: "16px",
})

const CarroList = () => {
  const [carros, setCarros] = useState<ICarro[]>(undefined)
  const [selectedCarroIndex, setSelectedCarroIndex] =
    useState<number>(undefined)
  const [isModalVisible, setIsModalVisible] = useState(false)

  useEffect(() => {
    ;(async () => await fetchCarros())()
  }, [])

  useEffect(() => {
    setIsModalVisible(selectedCarroIndex != undefined)
  }, [selectedCarroIndex])

  const fetchCarros = async () => {
    const { isSuccess, data } = await carroService.getAllCarros()
    if (isSuccess) {
      setCarros(data)
      return
    }

    setCarros(undefined)
  }

  const handleModalVisibility = (carroId?: string) => {
    setSelectedCarroIndex(() => {
      if (!carroId) return undefined
      if (carroId == "-1") return Number(carroId)

      return carros.findIndex((c) => c._id == carroId)
    })
  }

  const handleModalSubmit = async (carro: ICarro) => {
    let operation

    selectedCarroIndex == -1
      ? (operation = "createCarro")
      : (operation = "updateCarro")

    const { isSuccess } = await carroService[operation](carro)
    if (isSuccess) {
      await fetchCarros()
      setSelectedCarroIndex(undefined)
      setIsModalVisible(false)
    }
  }

  const handleModalDelete = async (carroId: string) => {
    const { isSuccess } = await carroService.deleteCarro(carroId)
    if (isSuccess) {
      await fetchCarros()
      setSelectedCarroIndex(undefined)
      setIsModalVisible(false)
    }
  }

  return (
    <>
      <Flex flexDirection="column">
        <HeaderContainer>
          <Text fontSize="2xl" w="80%">
            Lista de Carros
          </Text>
          <Button onClick={() => handleModalVisibility("-1")}>Novo</Button>
        </HeaderContainer>

        <ListContainer>
          {carros &&
            carros.map((c) => (
              <CarroListItem
                key={c._id}
                onClickHandler={handleModalVisibility}
                {...c}
              />
            ))}
        </ListContainer>
      </Flex>
      <CarroModal
        isOpen={isModalVisible}
        onClose={() => handleModalVisibility()}
        onSubmit={handleModalSubmit}
        onDelete={handleModalDelete}
        selectedCarro={carros?.[selectedCarroIndex]}
      />
    </>
  )
}

export default CarroList
