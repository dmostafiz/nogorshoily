import { Avatar, Box, Button, Center, Divider, Flex, Icon, Image, Show, Spacer, Stack, Text, useBreakpoint, VStack, Wrap } from '@chakra-ui/react'
import { HoverCard, Title, Tooltip } from '@mantine/core'
import { IconThumbUp } from '@tabler/icons'
import Link from 'next/link'
import React from 'react'
import { FileLike, Heart, ThumbUp } from 'tabler-icons-react'
import banglaNumber from '../../Helpers/banglaNumber'
import formatDate from '../../Helpers/formatDate'
import PostTrancate from './PostTrancate'
import { BsArrowRightShort, BsHandThumbsUp } from 'react-icons/bs'
import { FcComments, FcReading } from 'react-icons/fc'
import { AiFillLike } from 'react-icons/ai'
import { FaLongArrowAltRight } from 'react-icons/fa'
// import { ThumbUpOff } from 'tableicons-react'

export default function PostCard({ title, image, content, createdAt, states, author, slug, categories, authorCard = true }) {

    const imgBreakPoints = useBreakpoint({
        base: false,
        md: true
    })

    return (
        <Box w='full' rounded='md' overflow={'hidden'} mb={3}>


            {/* <Box my={3} /> */}

            <Flex direction={{ base: 'column', md: 'column', lg: 'row' }} gap={image ? 3 : 0}>


                <Flex direction={{ base: 'row', md: 'column', lg: 'column' }} gap={{ base: 2, lg: 0 }} w={{ base: 'full', md: '240px', lg: '240px' }}>


                    {image ?
                        <Box opacity={'.80'} w={{ base: '140px', lg: 'full' }} h={{ base: '100px', lg: '150px' }} shadow='sm' rounded='md'
                            overflow={'hidden'}
                            // bgImage={image}
                            objectFit='cover'
                            bgPos='center' bgSize='cover'>
                            <Link href={`/blog/${slug}`}>
                                <a href={`/blog/${slug}`}>
                                    <Center h='full' w='full'>
                                        {/* <Show below={'lg'}> */}
                                        <Image title={title} w='full' minH={'full'} objectFit={'cover'} src={image} alt='image' />
                                        {/* </Show> */}
                                    </Center>
                                </a>
                            </Link>
                        </Box>
                        : <></>}

                    <Box flex='1' textAlign={'left'} w='full' bg='.50' p={{ base: '0px', lg: 1 }} mb='2' >

                        <Link href={`/blog/${slug}`}>
                            <a href={`/blog/${slug}`}>
                                <Title order={3}><Text noOfLines={{ base: 1, lg: 2 }} lineHeight='1.3' color='gray.700'>{title}</Text></Title>
                            </a>
                        </Link>


                        <Text fontSize={'15px'} letterSpacing='-0.8px' color={'blackAlpha.600'} >
                            {formatDate(createdAt)}
                        </Text>

                        {categories?.length > 0 && <Box pt={3}>
                            <Wrap>

                                {categories.map((cat, index) => <Button
                                    key={index}
                                    size='xs'
                                >

                                    {cat.name}

                                </Button>)}

                            </Wrap>
                        </Box>}
                    </Box>

                </Flex>


                <Box flex='1'>

                    <Box borderTop={{base: '1px', md: '0px'}} borderBottom='1px' borderColor='blackAlpha.200' py={1} mb={2} >

                        <Text fontSize={'16px'} letterSpacing='-0.8px' color={'blackAlpha.600'}>
                            {/* <Avatar shadow={'sm'} src={author.image} size={'xs'} name='লিমন লস্কর' /> */}
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
                                                <Text fontSize={'12px'}>{banglaNumber(author?.posts?.length)} টি পোস্ট লিখেছেন</Text>
                                            </Box>
                                        </Flex>

                                        <Box>
                                            <Box px={0} pt={3}>
                                                <Text noOfLines={2} fontSize='13px'>{author.bio}</Text>
                                            </Box>

                                            <Divider my={1} />

                                            <Box bg={'blackAlpha.5'} fontSize={'13px'}>
                                                <Text mb={2}><Text as='span' fontSize={'16px'} fontWeight='bold'>
                                                    {banglaNumber(author?.followers?.length)}
                                                </Text> জন অনুসরন করছে</Text>
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
                            </HoverCard> </> : <> লিখেছেন {author?.displayName} </>}
                        </Text>
                    </Box>

                    <Box w='full' pb={2}>

                        <PostTrancate
                            char={350}
                            content={content}
                        />
                    </Box>


                    <Box w='full' borderTop='1px' borderBottom='0px' borderColor='blackAlpha.200' color='blackAlpha.600' py={1} fontSize='15px' fontWeight={'500'}>
                        <Flex gap={2} justify='space-between' alignItems={'center'}>

                            <Flex gap={4} flex='1' justify='flex-start' alignItems={'center'}>

                                <Tooltip withArrow color={'purple'} label={`${banglaNumber(states.read)} জন ব্লগটি পড়েছেন`}>
                                    <Flex alignItems={'center'} gap={'2px'} color={'gray.500'}>
                                        <FcReading color='' size='18px' />
                                        <Text as={'span'} fontWeight={'black'} fontSize='14px'>
                                            {banglaNumber(states.read)}
                                        </Text>
                                        <Text fontSize={'15px'} fontWeight='normal'> জন</Text>
                                    </Flex>
                                </Tooltip>


                                <Tooltip withArrow label={`${banglaNumber(states.like)} জন লাইক দিয়েছেন`} color={'orange'}>
                                    <Flex whiteSpace='nowrap' alignItems={'center'} gap={1}>
                                        <Icon as={AiFillLike} color='orange.300' fontSize='18px' />
                                        <Text>
                                            <Text as={'span'} fontSize='16px' fontWeight={'normal'}>{banglaNumber(states.like)}</Text> লাইক
                                        </Text>
                                    </Flex>
                                </Tooltip>


                                <Flex whiteSpace='nowrap' alignItems={'center'} gap={'2px'} color={'gray.500'}>
                                    <FcComments color='' size='18px' />
                                    {states.comment ? <Tooltip label={`${banglaNumber(states.comment)} টি মন্তব্য পাওয়া গেছে`}>
                                        <Flex gap={'5px'}>
                                            <Text as={'span'} fontWeight={'black'} fontSize='15px'>
                                                {banglaNumber(states.comment)}
                                            </Text>
                                            <Text fontSize={'15px'} fontWeight='normal'> মন্তব্য</Text>
                                        </Flex>
                                    </Tooltip> : <Text fontSize={'15px'} fontWeight='normal'> মন্তব্য নেই</Text>}

                                </Flex>

                            </Flex>



                            <Link href={`/blog/${slug}`}>
                                <Flex whiteSpace='nowrap' alignItems={'center'} gap={'2px'}>
                                    <Icon as={BsArrowRightShort} color='cyan.600' fontSize='18px' />
                                    <Text cursor={'pointer'} color='cyan.600' as={'span'} fontSize={'13px'} href={`/blog/${slug}`}>
                                        বিস্তারিত
                                    </Text>
                                </Flex>
                            </Link>



                        </Flex>
                    </Box>

                </Box>


            </Flex>


        </Box>
    )
}
