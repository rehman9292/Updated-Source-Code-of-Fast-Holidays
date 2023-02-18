import RandomFooter from '@/components/common/randomFooter';
import Layout from '@/components/layout';
import React from 'react';
import styles from '@/styles/txtpages.module.css';
import { Typography } from '@mui/material';

export default function Holidays() {
  return (
    <Layout title="Holidays">
      <div>
        <div className={styles.txtPage}>
          <div className={styles.section11}>
            <h1>Why do you choose Fast Flight?</h1>
            <Typography>
              Fast holidays ATOL protected IATA Holder Company with thousands of
              satisfied travelers as well as registered with Civil Aviation
              Authority UK.
            </Typography>
            <Typography>
              Fast flight is a prestigious air ticket provider that offers a
              wide range of flight options to various destinations.
            </Typography>
            <Typography>
              The company has established reputation for offering affordable and
              competitive prices, which is an important consideration for many
              travelers.
            </Typography>
            <Typography>
              Another advantage of Fast Flight is its customer service. The
              company is responsive and helpful customer support team that can
              assist the customers with any issues or concerns 24/7.
            </Typography>
            <Typography>
              This can be particularly helpful in case of flight delays,
              cancelation and any other unexpected events.
            </Typography>
            <Typography>
              Fast Flight always tries to provide flexible Package to our
              customers. By booking any product by Fast Flight the customers get
              peace of mind as Fast Flight get the responsibility from the date
              of departure till date of returning.
            </Typography>
            <Typography>
              Fast Flight also offers various kind of features which can enhance
              the overall travel experience. They can also choose to add extras
              such as seat selection, luggage allowance as well.
            </Typography>
            <Typography>
              In short, be our customer and get free from all worries.
            </Typography>
          </div>
        </div>
        <RandomFooter />
      </div>
    </Layout>
  );
}
