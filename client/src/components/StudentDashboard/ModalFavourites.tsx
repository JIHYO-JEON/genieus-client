import react, { useState, useEffect } from 'react'
import { auth } from '../../firebase'
import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Wrap,
  WrapItem,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
  UnorderedList,
  ListItem,
  Modal,
  ModalOverlay,
  ModalContent,
  Flex,
  ModalHeader,
} from '@chakra-ui/react'
import { useRemoveFavouriteTutorMutation } from '../../redux/services/studentService'

//@ts-ignore
const ModalFavourites = ({ isOpen, onClose, tutor }) => {
  const [removeTutor, removeTutorResult] = useRemoveFavouriteTutorMutation()
  const [userId, setUserId] = useState()

  useEffect(() => {
    auth.onAuthStateChanged((item) => {
      //@ts-ignore
      setUserId(item.uid)
    })
  }, [])

  const [loading, setLoading] = useState(false)
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent fontFamily="sans-serif">
          <ModalHeader m={0} fontWeight="400" align="center" fontSize="30px">
            <Center py={6}>
              <Box
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'lg'}
                p={6}
                textAlign={'center'}
              >
                <Avatar
                  size={'lg'}
                  name={tutor.name}
                  src={tutor.photo_url}
                  alt={'Avatar Alt'}
                  mb={4}
                  pos={'relative'}
                  _after={{
                    content: '""',
                    w: 4,
                    h: 4,
                    bg: 'green.300',
                    border: '2px solid white',
                    rounded: 'full',
                    pos: 'absolute',
                    bottom: 0,
                    right: 3,
                  }}
                />
                <Heading fontSize={'2xl'} fontFamily={'body'}>
                  {tutor.name}
                </Heading>

                <Flex mt={5} direction="column" alignItems="flex-start">
                  <Text fontWeight="bold" color="indigo.400" fontSize={'22px'}>
                    Languages:
                  </Text>

                  {!loading &&
                    tutor.programming_languages.map((lang: any) => {
                      return (
                        <Box>
                          <UnorderedList>
                            <ListItem fontSize={18} fontWeight={200}>
                              {lang}
                            </ListItem>
                          </UnorderedList>
                        </Box>
                      )
                    })}

                  <Flex mt={5} direction="column" alignItems="flex-start">
                    <Text
                      fontWeight="bold"
                      color="indigo.400"
                      fontSize={'22px'}
                    >
                      Personal Info:{' '}
                    </Text>
                    <Text my={5} fontSize={'18px'}>
                      Bio: {tutor.bio}
                    </Text>
                    <Text fontSize={'18px'}>Location: {tutor.location}</Text>
                  </Flex>
                </Flex>

                <Wrap
                  align={'flex-start'}
                  justify={'flex-start'}
                  direction={'row'}
                  mt={6}
                  w="400px"
                >
                  {!loading &&
                    tutor.tags.map((lang: any) => {
                      return (
                        <WrapItem>
                          <Badge
                            px={2}
                            py={1}
                            fontSize={'18px'}
                            fontWeight={'400'}
                            borderRadius="10px"
                            mx={3}
                          >
                            #{lang}
                          </Badge>
                        </WrapItem>
                      )
                    })}
                </Wrap>

                <Stack
                  d="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  mt={8}
                  direction={'row'}
                  spacing={4}
                >
                  <Button
                    onClick={() =>
                      removeTutor({ studentId: userId, tutorId: tutor.id })
                    }
                    fontSize={'sm'}
                    w={'10vh'}
                    rounded={'full'}
                    variant={'outline'}
                    boxShadow={
                      '0px 1px 1px 1px rgb(66 153 225 / 48%), 0 1px 1px -5px rgb(66 153 225 / 43%)'
                    }
                    _hover={{
                      opacity: 0.6,
                    }}
                  >
                    Remove
                  </Button>
                </Stack>
              </Box>
            </Center>
          </ModalHeader>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
}

export default ModalFavourites
