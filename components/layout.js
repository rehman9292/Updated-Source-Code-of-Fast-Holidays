import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Header from './header';
import Footer from './footer';
import styles from '@/styles/components/layout.module.css';

import {
  Drawer,
  Box,
  Avatar,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  List,
  ListItemText,
  IconButton,
  Button,
  CssBaseline,
  Fab,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';

import HomeIcon from '@mui/icons-material/Home';
import { theme } from '@/styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CallIcon from '@mui/icons-material/Call';
import { number, whatsapp } from '../utils/constants';
import { getCookie, setCookie } from 'utils/cookies';
import DialogComponent from './common/dialog';

import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import PolicyIcon from '@mui/icons-material/Policy';
import GavelIcon from '@mui/icons-material/Gavel';
import HelpIcon from '@mui/icons-material/Help';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import AirlinesIcon from '@mui/icons-material/Airlines';
import SendIcon from '@mui/icons-material/Send';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import FlightIcon from '@mui/icons-material/Flight';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';

const drawerWidth = 280;

const muiStyles = {
  avatar: {
    width: '5rem',
    height: '5rem',
  },
  closeBtn: {
    padding: '5px 0',
    width: '20px',
  },
};

export default function Layout({
  title,
  keywords,
  author,
  description,
  children,
  addProductJson,
  window,
  robots,
  ogTitle,
  ogType,
  ogDescription,
  ogImage,
  ogSiteName,
  canonical,
  ogLocale,
  ogUrl,
  twitterCard,
  twitterLabel1,
  twitterTitle,
  twitterDescription,
  twitterSite,
  twitterCreator,
}) {
  const router = useRouter();
  const [showSideBar, setShowSideBar] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const drawer = (
    <div className={styles.drawer}>
      <ThemeProvider theme={theme}>
        <div className={styles.drawerLinks}>
          <List sx={{ padding: 0, marginTop: '5px' }}>
            <Link href="/" className={styles.link}>
              <ListItem
                button={router.pathname == '/' ? false : true}
                sx={
                  router.pathname == '/'
                    ? {
                        backgroundColor: '#00b6f2',
                        cursor: 'pointer',
                        color: 'white',
                      }
                    : { cursor: 'pointer' }
                }
              >
                <ListItemIcon>
                  <HomeIcon
                    sx={
                      router.pathname == '/'
                        ? { color: 'white' }
                        : { color: '#00b6f2' }
                    }
                  />
                </ListItemIcon>
                <ListItemText className={styles.listItemText}>
                  Home
                </ListItemText>
              </ListItem>
            </Link>
            <Divider />
            <Link href="/destinations" className={styles.link}>
              <ListItem
                button={router.pathname == '/destinations' ? false : true}
                sx={
                  router.pathname == '/destinations'
                    ? {
                        backgroundColor: '#00b6f2',
                        cursor: 'pointer',
                        color: 'white',
                      }
                    : { cursor: 'pointer' }
                }
              >
                <ListItemIcon>
                  <AddLocationAltIcon
                    sx={
                      router.pathname == '/destinations'
                        ? { color: 'white' }
                        : { color: '#00b6f2' }
                    }
                  />
                </ListItemIcon>
                <ListItemText className={styles.listItemText}>
                  Destinations
                </ListItemText>
              </ListItem>
            </Link>
            <Divider />

            <Link href="/flights" className={styles.link}>
              <ListItem
                button={router.pathname == '/flights' ? false : true}
                sx={
                  router.pathname == '/flights'
                    ? {
                        backgroundColor: '#00b6f2',
                        cursor: 'pointer',
                        color: 'white',
                      }
                    : { cursor: 'pointer' }
                }
              >
                <ListItemIcon>
                  <FlightIcon
                    sx={
                      router.pathname == '/flights'
                        ? { color: 'white' }
                        : { color: '#00b6f2' }
                    }
                  />
                </ListItemIcon>
                <ListItemText className={styles.listItemText}>
                  Flights
                </ListItemText>
              </ListItem>
            </Link>
            <Divider />

            <Link href="/holidays" className={styles.link}>
              <ListItem
                button={router.pathname == '/holidays' ? false : true}
                sx={
                  router.pathname == '/holidays'
                    ? {
                        backgroundColor: '#00b6f2',
                        cursor: 'pointer',
                        color: 'white',
                      }
                    : { cursor: 'pointer' }
                }
              >
                <ListItemIcon>
                  <HolidayVillageIcon
                    sx={
                      router.pathname == '/holidays'
                        ? { color: 'white' }
                        : { color: '#00b6f2' }
                    }
                  />
                </ListItemIcon>
                <ListItemText className={styles.listItemText}>
                  Holidays
                </ListItemText>
              </ListItem>
            </Link>
            <Divider />
            <Link href="/airlines" className={styles.link}>
              <ListItem
                button={router.pathname == '/airlines' ? false : true}
                sx={
                  router.pathname == '/airlines'
                    ? {
                        backgroundColor: '#00b6f2',
                        cursor: 'pointer',
                        color: 'white',
                      }
                    : { cursor: 'pointer' }
                }
              >
                <ListItemIcon>
                  <AirlinesIcon
                    sx={
                      router.pathname == '/airlines'
                        ? { color: 'white' }
                        : { color: '#00b6f2' }
                    }
                  />
                </ListItemIcon>
                <ListItemText className={styles.listItemText}>
                  Airlines
                </ListItemText>
              </ListItem>
            </Link>
            <Divider />
            <Link href="/send-inquiry" className={styles.link}>
              <ListItem
                button={router.pathname == '/send-inquiry' ? false : true}
                sx={
                  router.pathname == '/send-inquiry'
                    ? {
                        backgroundColor: '#00b6f2',
                        cursor: 'pointer',
                        color: 'white',
                      }
                    : { cursor: 'pointer' }
                }
              >
                <ListItemIcon>
                  <SendIcon
                    sx={
                      router.pathname == '/send-inquiry'
                        ? { color: 'white' }
                        : { color: '#00b6f2' }
                    }
                  />
                </ListItemIcon>
                <ListItemText className={styles.listItemText}>
                  Send Inquiry
                </ListItemText>
              </ListItem>
            </Link>
            <Divider />
            <Link href="/beat-my-quote" className={styles.link}>
              <ListItem
                button={router.pathname == '/beat-my-quote' ? false : true}
                sx={
                  router.pathname == '/beat-my-quote'
                    ? {
                        backgroundColor: '#00b6f2',
                        cursor: 'pointer',
                        color: 'white',
                      }
                    : { cursor: 'pointer' }
                }
              >
                <ListItemIcon>
                  <RequestQuoteIcon
                    sx={
                      router.pathname == '/beat-my-quote'
                        ? { color: 'white' }
                        : { color: '#00b6f2' }
                    }
                  />
                </ListItemIcon>
                <ListItemText className={styles.listItemText}>
                  Beat My Quote
                </ListItemText>
              </ListItem>
            </Link>
            <Divider />
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>More</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List sx={{ padding: 0, marginTop: '0' }}>
                  <Link href={`/contact-us`} className={styles.link}>
                    <ListItem
                      button={router.pathname == '/contact-us' ? false : true}
                      sx={
                        router.pathname == '/contact-us'
                          ? {
                              backgroundColor: '#00b6f2',
                              cursor: 'pointer',
                              color: 'white',
                            }
                          : { cursor: 'pointer' }
                      }
                    >
                      <ListItemIcon>
                        <ContactSupportIcon
                          sx={
                            router.pathname == '/contact-us'
                              ? { color: 'white' }
                              : { color: '#00b6f2' }
                          }
                        />
                      </ListItemIcon>
                      <ListItemText className={styles.listItemText}>
                        Contact us
                      </ListItemText>
                    </ListItem>
                  </Link>
                  <Divider />
                  <Link href={`/privacy-policy`} className={styles.link}>
                    <ListItem
                      button={
                        router.pathname == '/privacy-policy' ? false : true
                      }
                      sx={
                        router.pathname == '/privacy-policy'
                          ? {
                              backgroundColor: '#00b6f2',
                              cursor: 'pointer',
                              color: 'white',
                            }
                          : { cursor: 'pointer' }
                      }
                    >
                      <ListItemIcon>
                        <PolicyIcon
                          sx={
                            router.pathname == '/privacy-policy'
                              ? { color: 'white' }
                              : { color: '#00b6f2' }
                          }
                        />
                      </ListItemIcon>
                      <ListItemText className={styles.listItemText}>
                        Privacy Policy
                      </ListItemText>
                    </ListItem>
                  </Link>
                  <Divider />
                  <Link href={`/booking-conditions`} className={styles.link}>
                    <ListItem
                      button={
                        router.pathname == '/booking-conditions' ? false : true
                      }
                      sx={
                        router.pathname == '/booking-conditions'
                          ? {
                              backgroundColor: '#00b6f2',
                              cursor: 'pointer',
                              color: 'white',
                            }
                          : { cursor: 'pointer' }
                      }
                    >
                      <ListItemIcon>
                        <GavelIcon
                          sx={
                            router.pathname == '/booking-conditions'
                              ? { color: 'white' }
                              : { color: '#00b6f2' }
                          }
                        />
                      </ListItemIcon>
                      <ListItemText className={styles.listItemText}>
                        Booking Conditions
                      </ListItemText>
                    </ListItem>
                  </Link>
                  <Divider />
                  <Link href={`/terms-conditions`} className={styles.link}>
                    <ListItem
                      button={
                        router.pathname == '/terms-conditions' ? false : true
                      }
                      sx={
                        router.pathname == '/terms-conditions'
                          ? {
                              backgroundColor: '#00b6f2',
                              cursor: 'pointer',
                              color: 'white',
                            }
                          : { cursor: 'pointer' }
                      }
                    >
                      <ListItemIcon>
                        <HelpIcon
                          sx={
                            router.pathname == '/terms-conditions'
                              ? { color: 'white' }
                              : { color: '#00b6f2' }
                          }
                        />
                      </ListItemIcon>
                      <ListItemText className={styles.listItemText}>
                        Terms & Conditions
                      </ListItemText>
                    </ListItem>
                  </Link>
                  <Divider />
                  <Link href={`/faqs`} className={styles.link}>
                    <ListItem
                      button={router.pathname == '/faqs' ? false : true}
                      sx={
                        router.pathname == '/faqs'
                          ? {
                              backgroundColor: '#00b6f2',
                              cursor: 'pointer',
                              color: 'white',
                            }
                          : { cursor: 'pointer' }
                      }
                    >
                      <ListItemIcon>
                        <QuestionAnswerIcon
                          sx={
                            router.pathname == '/faqs'
                              ? { color: 'white' }
                              : { color: '#00b6f2' }
                          }
                        />
                      </ListItemIcon>
                      <ListItemText className={styles.listItemText}>
                        FAQs
                      </ListItemText>
                    </ListItem>
                  </Link>
                  <Divider />
                </List>
              </AccordionDetails>
            </Accordion>
          </List>
        </div>
        <div>{/* <Button>Call</Button> */}</div>
      </ThemeProvider>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <Head>
        <link rel="shortcut icon" href="" type="image/x-icon" />
        <title>{title}</title>
        {robots && <meta name="robots" content={robots} />}
        {keywords && <meta name="keywords" content={keywords} />}
        {description && <meta name="description" content={description} />}
        {author && <meta name="author" content={author} />}
        {ogTitle && <meta property="og:title" content={ogTitle} />}
        {ogType && <meta property="og:type" content={ogType} />}
        {ogDescription && (
          <meta property="og:description" content={ogDescription} />
        )}
        {ogImage && <meta property="og:image" content={ogImage} />}
        {ogSiteName && <meta property="og:site_name" content={ogSiteName} />}
        {canonical && <link rel="canonical" href={canonical} />}
        {ogLocale && <meta property="og:locale" content={ogLocale} />}
        {ogType && <meta property="og:type" content={ogType} />}
        {ogUrl && <meta property="og:url" content={ogUrl} />}
        {ogSiteName && <meta property="og:site_name" content={ogSiteName} />}
        {twitterCard && <meta name="twitter:card" content={twitterCard} />}
        {twitterLabel1 && (
          <meta name="twitter:label1" content={twitterLabel1} />
        )}
        {twitterTitle && <meta name="twitter:title" content={twitterTitle} />}
        {twitterDescription && (
          <meta name="twitter:description" content={twitterDescription} />
        )}
        {twitterSite && <meta name="twitter:site" content={twitterSite} />}
        {twitterCreator && (
          <meta name="twitter:creator" content={twitterCreator} />
        )}
        {addProductJson && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={addProductJson}
            key="product-jsonld"
          />
        )}
      </Head>
      <Header onMenuClick={handleSideBar} clicked={showSideBar} />
      <Box
        className="drawer"
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={showSideBar}
          anchor="right"
          onClose={handleSideBar}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              background: 'white',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component={styles.main}>
        <div className={styles.child}>{children}</div>
      </Box>
      <Footer />
      <div className={styles.fabContainer}>
        <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer">
          <div
            className={styles.fab1}
            // onClick={() => handleSideBar(!showSideBar)}
          >
            <WhatsAppIcon />
          </div>
        </a>
        <a href={`tel:${number}`}>
          <div
            className={styles.fab2}
            // onClick={() => handleSideBar(!showSideBar)}
          >
            <CallIcon />
          </div>
        </a>
      </div>
      {/* <Dialog
        open={showDialog}
        keepMounted
        onClose={() => setShowDialog(false)} */}
      {/* > */}
      <DialogComponent />
      {/* </Dialog> */}
    </div>
  );
}

Layout.defaultProps = {
  title: 'Fast Holidays',
  description: '',
  keywords: '',
};

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(4),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  marginTop: 0,
}));
