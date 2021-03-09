import React from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Box, Typography } from '@material-ui/core';
import CodeBlock from './CodeBlock';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

interface IProps {
    linux: string;
    mac: string;
    showLineNumbers?: boolean
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function CodeBlockTabs(props: IProps) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box style={{ marginTop: '-12px' }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }

      const AntTabs = withStyles({
        root: {
          borderBottom: '1px solid #e8e8e8',
        },
        indicator: {
          backgroundColor: '#3f51b5',
        },
      })(Tabs);

      interface StyledTabProps {
        label: string;
      }
      
      const AntTab = withStyles((theme: Theme) =>
        createStyles({
          root: {
            textTransform: 'none',
            minWidth: 72,
            backgroundColor: 'transparent',
            fontWeight: theme.typography.fontWeightRegular,
            marginRight: theme.spacing(4),
            fontFamily: [
              '-apple-system',
              'BlinkMacSystemFont',
              '"Segoe UI"',
              'Roboto',
              '"Helvetica Neue"',
              'Arial',
              'sans-serif',
              '"Apple Color Emoji"',
              '"Segoe UI Emoji"',
              '"Segoe UI Symbol"',
            ].join(','),
            '&:hover': {
              color: '#3f51b5',
              opacity: 1,
            },
            '&$selected': {
              color: '#3f51b5',
              fontWeight: theme.typography.fontWeightMedium,
            },
            '&:focus': {
              color: '#3f51b5',
            },
          },
          selected: {},
        }),
      )((props: StyledTabProps) => <Tab disableRipple {...props} />);

    return (
        <div>
            <AntTabs style={{ marginTop: '12px' }} value={value} onChange={handleChange} aria-label="ant example">
                <AntTab label="Linux" {...a11yProps(0)} />
                <AntTab label="MacOS" {...a11yProps(1)} />
            </AntTabs>
            <TabPanel value={value} index={0}>
                <CodeBlock
                showLineNumbers={props.showLineNumbers}
                language='bash'
                code={props.linux}
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CodeBlock
                showLineNumbers={props.showLineNumbers}
                language='bash'
                code={props.mac}
                />
            </TabPanel>
        </div>
    )
}
