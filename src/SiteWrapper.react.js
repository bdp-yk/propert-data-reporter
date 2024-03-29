/* eslint-disable jsx-a11y/anchor-is-valid */
// @flow

import * as React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Grid, List, RouterContextProvider, Site } from "tabler-react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import type { NotificationProps } from "tabler-react";

type Props = {|
  +children: React.Node,
|};

type State = {|
  notificationsObjects: Array < NotificationProps >,
|};

type subNavItem = {|
  +value: string,
  +to ?: string,
  +icon ?: string,
  +LinkComponent ?: React.ElementType,
  +useExact ?: boolean,
|};

type navItem = {|
  +value: string,
  +to ?: string,
  +icon ?: string,
  +active ?: boolean,
  +LinkComponent ?: React.ElementType,
  +subItems ?: Array < subNavItem >,
  +useExact ?: boolean,
|};

const navBarItems: Array<navItem> = [
  {
    value: "Home",
    to: "/",
    icon: "home",
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
  {
    value: "Pricing",
    icon: "dollar-sign",
    to: "/pricing",
    LinkComponent: withRouter(NavLink),
  },
  {
    value: "My Reports",
    icon: "file",
    to: "/reports",
    LinkComponent: withRouter(NavLink),
  }
];

const accountDropdownProps = e => ({
  avatarURL: e.auth.user.avatar,
  name: e.auth.user.name,
  options: [
    { icon: "user", value: "Profile" },
    { icon: "settings", value: "Settings" },
    { isDivider: true },
    { icon: "help-circle", value: "Need help?" },
    { icon: "log-out", value: "Sign out", to: "/log-out" },
  ],
});

class SiteWrapper extends React.Component<Props, State> {
  state = {
    notificationsObjects: [
      {
        unread: true,
        avatarURL: "demo/faces/male/41.jpg",
        message: (
          <React.Fragment>
            <strong>Nathan</strong> pushed new commit: Fix page load performance
            issue.
          </React.Fragment>
        ),
        time: "10 minutes ago",
      },
      {
        unread: true,
        avatarURL: "demo/faces/female/1.jpg",
        message: (
          <React.Fragment>
            <strong>Alice</strong> started new task: Tabler UI design.
          </React.Fragment>
        ),
        time: "1 hour ago",
      },
      {
        unread: false,
        avatarURL: "demo/faces/female/18.jpg",
        message: (
          <React.Fragment>
            <strong>Rose</strong> deployed new version of NodeJS REST Api // V3
          </React.Fragment>
        ),
        time: "2 hours ago",
      },
    ],
  };

  render(): React.Node {
    return (
      <Site.Wrapper
        headerProps={{
          href: "/",
          alt: "Tabler React",
          imageURL: "./demo/brand/full-logo.png",
          accountDropdown: accountDropdownProps(this.props)
        }}
        navProps={{ itemsObjects: navBarItems }}
        routerContextComponentType={withRouter(RouterContextProvider)}
        footerProps={{
          copyright: (
            <React.Fragment>
              Copyright © {new Date().getFullYear()}.
              All rights reserved.
            </React.Fragment>
          ),
          nav: (
            <React.Fragment>
              <Grid.Col auto={true}>
                <List className="list-inline list-inline-dots mb-0">
                  <List.Item className="list-inline-item">
                    <a href="./docs/index.html">Documentation</a>
                  </List.Item>
                  <List.Item className="list-inline-item">
                    <a href="./faq.html">FAQ</a>
                  </List.Item>
                </List>
              </Grid.Col>
            </React.Fragment>
          ),
        }}
      >
        {this.props.children}
      </Site.Wrapper>
    );
  }
}


SiteWrapper.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps,{})(SiteWrapper)
