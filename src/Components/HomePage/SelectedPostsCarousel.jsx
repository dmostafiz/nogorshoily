import { Box } from '@chakra-ui/react';
import { Carousel } from '@mantine/carousel';
import { Button, createStyles, Paper, Text, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react'


const useStyles = createStyles((theme) => ({
    card: {
        height: 350,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontWeight: 900,
        color: theme.white,
        lineHeight: 1.2,
        fontSize: 32,
        marginTop: theme.spacing.xs,
    },

    category: {
        color: theme.white,
        opacity: 0.7,
        fontWeight: 700,
        textTransform: 'uppercase',
    },
}));


const data = [
    {
        image:
            'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'অনুবাদঃ সর্বেশ্বর দয়াল সাক্সেনার আরও তিনটি কবিতা',
        category: 'nature',
    },
    {
        image:
            'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'কিভাবে কিছু প্রাণী ‘কুমারী জন্মদান’ করে: পার্থেনোজেনেসিস- এর ব্যাখ্যা করা হয়েছে',
        category: 'beach',
    },
    {
        image:
            'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'পথে-প্রান্তরে (পর্ব-১২): অসলো (শেষ কিস্তি)',
        category: 'nature',
    },
    {
        image:
            'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'গল্পঃ জীবনের শেষ মুহুর্ত',
        category: 'nature',
    },
    {
        image:
            'https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'বাংলার প্রাচীন মঠ (স্মৃতি-মন্দির) সমগ্র - ০৩',
        category: 'tourism',
    },
    {
        image:
            'https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
        title: 'বালিয়াটি জমিদার বাড়ি',
        category: 'nature',
    },
];

export default function SelectedPostsCarousel() {

    const theme = useMantineTheme();

    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

    const { classes } = useStyles();

    return (
        <Box w='full'>
            <Carousel
                slideSize="50%"
                breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 1 }]}
                slideGap="sm"
                align="start"
                slidesToScroll={mobile ? 1 : 1}
                containScroll='trimSnaps'
            >
                {data.map((item) => (
                    <Carousel.Slide key={item.title}>
                        <Paper
                            shadow="lg"
                            p="xl"
                            radius="lg"
                            sx={{ backgroundImage: `url(${item.image})` }}
                            className={classes.card}
                        >
                            <div>
                                <Text className={classes.category} size="xs">
                                    {item.category}
                                </Text>
                                <Title order={3} className={classes.title}>
                                    {item.title}
                                </Title>
                            </div>
                            <Button variant="white" color="dark">
                                বিস্তারিত পড়ুন
                            </Button>
                        </Paper>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </Box>
    );

}
