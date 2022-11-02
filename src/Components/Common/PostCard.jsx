import { Avatar, Box, Button, Center, Divider, Flex, Icon, Image, Show, Spacer, Text, useBreakpoint, VStack, Wrap } from '@chakra-ui/react'
import { HoverCard, Title } from '@mantine/core'
import { IconThumbUp } from '@tabler/icons'
import Link from 'next/link'
import React from 'react'
import { FileLike, Heart, ThumbUp } from 'tabler-icons-react'
import banglaNumber from '../../Helpers/banglaNumber'
import formatDate from '../../Helpers/formatDate'
import PostTrancate from './PostTrancate'
import { BsHandThumbsUp } from 'react-icons/bs'
import { FcComments, FcReading } from 'react-icons/fc'
import { AiFillLike } from 'react-icons/ai'
// import { ThumbUpOff } from 'tableicons-react'

export default function PostCard({ title, image, content, createdAt, states, author, slug, authorCard = true }) {

    const imgBreakPoints = useBreakpoint({
        base: false,
        md: true
    })

    return (
        <Box w='full' rounded='md' overflow={'hidden'}>

            <Box w='full' bg='.50'>
                <Link href={`/blog/${slug}`}>
                    <a href={`/blog/${slug}`}>
                        <Title order={3}><Text color='gray.900'>{title}</Text></Title>
                    </a>
                </Link>


                <Box my={{ base: 2, md: 0 }} fontSize={'15px'}>
                    <Flex alignItems={'center'} gap={2}>
                        {/* <Avatar shadow={'sm'} src={author.image} size={'md'} name='লিমন লস্কর' /> */}
                        <Box fontSize={'15px'} color={'blackAlpha.600'}>
                            {/* <Avatar shadow={'sm'} src={author.image} size={'sm'} name='লিমন লস্কর' /> */}
                            {authorCard ? <> লিখেছেন <HoverCard width={320} shadow="md" withArrow openDelay={0} closeDelay={400}>
                                <HoverCard.Target>
                                    <Text as='span' color={'blue.500'}>
                                        {author.displayName}
                                    </Text>
                                </HoverCard.Target>
                                <HoverCard.Dropdown p={10}>

                                    <Box bg='blackAlpha.5'>
                                        <Flex direction={{ base: 'row', md: 'row' }} gap={3}>
                                            <Box>
                                                <Avatar size='md' shadow src={author.avatar} name={author.displayName} />
                                            </Box>
                                            <Box>
                                                <Title order={4}><Text noOfLines={1}>{author.displayName}</Text></Title>
                                                <Text fontSize={'12px'}>{banglaNumber(7)} টি পোস্ট লিখেছেন</Text>
                                            </Box>
                                        </Flex>

                                        <Box>
                                            <Box px={0} pt={3}>
                                                <Text noOfLines={2} fontSize='13px'>{author.bio}</Text>
                                            </Box>

                                            <Divider my={1} />

                                            <Box bg={'blackAlpha.5'} fontSize={'13px'}>
                                                <Text mb={2}><Text as='span' fontSize={'16px'} fontWeight='bold'>১৪</Text> জন অনুসরন করছে</Text>
                                                <Wrap spacing={2} alignItems='flex-end'>
                                                    <Link href={`/blogger/${author.id}`}>
                                                        <Button size='xs' rounded={'none'} colorScheme={'yellow'}>সকল পোস্ট দেখুন</Button>
                                                    </Link>
                                                    <Button size='xs' rounded={'none'} colorScheme={'blackAlpha'}>অনুসরণ করুন</Button>
                                                </Wrap>
                                            </Box>
                                        </Box>
                                        {/* <Divider my={1} /> */}
                                    </Box>

                                </HoverCard.Dropdown>
                            </HoverCard>, </> : <> লিখেছেন {author?.displayName}, </>} <Text as='span' fontSize={'13px'}>
                                {formatDate(createdAt)}
                            </Text>

                        </Box>
                    </Flex>

                </Box>

            </Box>

            <Box my={3} />

            <Flex direction={{ base: 'column', md: 'column', lg: 'row' }} gap={image ? 3 : 0}>

                {image ? <Box w={{ base: 'full', md: 'full', lg: '45%' }} maxH={{ lg: '207px' }} shadow='md' border='2px' borderColor={'blackAlpha.200'} p={1} rounded='md' overflow={'hidden'}
                    // bgImage={image}
                    objectFit='cover'
                    bgPos='center' bgSize='cover'>
                    <Center bg='whiteAlpha.700' backdropFilter='blur(5px)' rounded='md' overflow={'hidden'} h='full' w='full'>
                        {/* <Show below={'lg'}> */}
                        <Image maxW={{ base: '70%', md: 'full' }} minH={'full'} objectFit={'cover'} shadow='sm' src={image} alt='image' />
                        {/* </Show> */}
                    </Center>
                </Box> : <></>}


                <VStack flex={1} w='full' textAlign={'justify'} px={image ? 0 : 2}>
                    {/* <Box>
                        <Text noOfLines={'4'} dangerouslySetInnerHTML={{__html: content}} /> <Link href={`/blog/${slug}`}>
                            <a href={`/blog/${slug}`}>বাকিটুকু পড়ুন</a>
                        </Link>
                    </Box> */}


                    <Box pt={image ? '10px' : '0px'}>
                        <PostTrancate
                            lines={7}
                            content={content}
                            slug={<Link href={`/blog/${slug}`}>
                                <Text cursor={'pointer'} color='blue.500' as={'span'} fontSize={'13px'} href={`/blog/${slug}`}>পড়ুন</Text>
                            </Link>}
                        />
                    </Box>


                    <Box w='full' borderTop='1px' borderColor='blackAlpha.200' color='blackAlpha.600' py={1} fontSize='15px' fontWeight={'500'}>
                        <Flex gap={2} justify='space-between' alignItems={'center'}>
                            <Flex gap={2} justify='flex-start' alignItems={'center'}>
                                <Flex alignItems={'center'} gap={'2px'} color={'gray.500'}>
                                    <FcReading color='' size='18px' />
                                    <Text as={'span'} fontWeight={'black'} fontSize='14px'>
                                        {banglaNumber(states.read)}
                                    </Text>
                                    <Text fontSize={'15px'} fontWeight='normal'> জন পড়েছেন</Text>
                                </Flex>
                                <Divider orientation='vertical' borderColor={'blackAlpha.50'} h='10px' />

                                <Flex alignItems={'center'} gap={'2px'} color={'gray.500'}>
                                    <FcComments color='' size='18px' />
                                    {states.comment ? <>
                                        <Text as={'span'} fontWeight={'black'} fontSize='15px'>
                                            {banglaNumber(states.comment)}
                                        </Text>
                                        <Text fontSize={'15px'} fontWeight='normal'> মন্তব্য</Text>
                                    </> : <Text fontSize={'15px'} fontWeight='normal'> মন্তব্য nai</Text>}

                                </Flex>

                            </Flex>

                            <Flex alignItems={'center'} gap={1}>
                                <Icon as={AiFillLike} color='orange.300' fontSize='18px' />
                                <Text>
                                    <Text as={'span'} fontSize='16px' fontWeight={'normal'}>{banglaNumber(states.like)}</Text> লাইক
                                </Text>
                            </Flex>
                        </Flex>
                    </Box>

                </VStack>

            </Flex>


        </Box>
    )
}
