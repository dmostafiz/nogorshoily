import { Avatar, AvatarBadge, Box, Button, Center, Flex, Icon, Image, Text, Tooltip, Wrap } from '@chakra-ui/react';
import { Carousel } from '@mantine/carousel';
import { createStyles, Paper, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { useCallback, useEffect, useState } from 'react'
import { useBreakpointValue } from '@chakra-ui/react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css/pagination';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';

import { Navigation, Pagination, Scrollbar } from 'swiper';
import Link from 'next/link';
import { ArrowForward } from 'tabler-icons-react';
// import { useQuery } from '@tanstack/react-query';
import Axios from '../../Helpers/axiosHelper';
import { useQuery } from '@tanstack/react-query';
import formatDate from '../../Helpers/formatDate';
import AuthorHoverCard from '../Common/AuthorHoverCard';
import SliderPostCarkSkeleton from '../Common/Skeletons/SliderPostCarkSkeleton';
import useOnlineUser from '../../Hooks/useOnlineUser';
import truncate from 'truncate-html';

export default function TopPostsCarousel() {

    const { data, isLoading, isError, error } = useQuery(['topPosts'], async () => {
        const response = await Axios.get('/post/get_top_posts/9')
        return response?.data?.posts || []
    })


    const { isUserOnline } = useOnlineUser()

    return (
        <Box w='full'>
            <Swiper
                spaceBetween={12}
                slidesPerView={useBreakpointValue({
                    base: 2,
                    md: 2,
                    lg: 3
                })}
                navigation
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                modules={[Navigation, Scrollbar]}
            >
                {!isLoading && data.length ? data?.map((item, index) => (
                    <SwiperSlide key={index}>

                        <Box zIndex={0} shadow='md' borderColor={'blackAlpha.200'} p={0} w={'full'} rounded='xl'>

                            {item.image ?
                                <Box
                                    w={{ base: 'full', lg: 'full' }}
                                    h={{ base: '140px', lg: '140px' }} 
                                    roundedTop='xl'
                                    roundedBottom=''
                                    overflow={'hidden'}
                                    bgPos='center' bgSize='cover'
                                >
                                    <Link zIndex='0' href={`/blog/${item.id}`}>
                                        <a href={`/blog/${item.id}`}>
                                            <Center zIndex={0} h='full' w='full' >
                                                {/* <Show below={'lg'}> */}
                                                <Image zIndex={111} title={item.title} w='full' minH={'full'} objectFit={'cover'} src={item.image} alt='image' />
                                                {/* </Show> */}
                                            </Center>
                                        </a>
                                    </Link>
                                </Box>
                                :<Box roundedTop='xl' roundedBottom='' h={{ base: '140px', lg: '140px' }} overflow='hidden' fontSize={'15px'} p={3} bgGradient='linear(to-r, facebook.700, blue.600)'  color={'whiteAlpha.700'}>
                                {truncate(item.content, 120, {
                                    stripTags: true,
                                })}
                            </Box>}

                            <Box px={1} py={2} textAlign={'left'} w='full' bg='.50' mb='2' >

                                <Link href={`/blog/${item.id}`}>
                                    <a href={`/blog/${item.id}`}>
                                        <Tooltip hasArrow label={item.title}>
                                            <Title order={4}><Text noOfLines={1} lineHeight='1.3' color='gray.700'>{item.title}</Text></Title>
                                        </Tooltip>
                                    </a>
                                </Link>

                                <Text fontSize={'12px'} letterSpacing='-0.8px' color={'blackAlpha.600'} >
                                    {formatDate(item.publishedAt)}
                                </Text>

                                <Box pt={2}>
                                    <Flex alignItems={'center'} gap={2}>
                                        <Avatar opacity={.7} size={'xs'} name={item.author.displayName} src={item.author.avatar} >
                                            {isUserOnline(item.author.id) && <AvatarBadge boxSize='1.25em' bg='green.500' />}
                                        </Avatar>
                                        <AuthorHoverCard author={item.author} />
                                    </Flex>

                                </Box>



                                {/* {item.categories?.length > 0 && <Box pt={2}>
                                    <Wrap>

                                        {item.categories.map((cat, index) => <Button
                                            key={index}
                                            size='xs'
                                            variant={'solid'}
                                        >

                                            {cat.name}

                                        </Button>)}

                                    </Wrap>
                                </Box>} */}

                            </Box>

                        </Box>

                    </SwiperSlide>
                )) : <>

                    <SwiperSlide>
                        <SliderPostCarkSkeleton />
                    </SwiperSlide>

                    <SwiperSlide>
                        <SliderPostCarkSkeleton />
                    </SwiperSlide>

                    <SwiperSlide>
                        <SliderPostCarkSkeleton />
                    </SwiperSlide>

                </>}

                {/* <span slot="container-start">Container Start</span> */}
            </Swiper>
            <Box pt={1}>
                <Link href='/top_posts'>
                    <Flex w={'auto'} cursor={'pointer'} color={'blue.700'} gap={0}>
                        <Icon as={ArrowForward} fontSize='16px' />
                        <Text fontSize={'13px'} fontWeight='bold'>সকল জনপ্রিয় পোস্ট</Text>
                    </Flex>
                </Link>
            </Box>
        </Box>
    );

}
