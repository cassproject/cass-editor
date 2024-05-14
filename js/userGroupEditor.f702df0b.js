(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["userGroupEditor","chunk-2d0dab46","chunk-25a2af2a","chunk-25a2af2a","chunk-2d0dab46"],{

/***/ "00f9":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "39f8":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4a5b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__("498a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.concat.js
var es_array_concat = __webpack_require__("99af");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"fffa3e18-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/usersGroups/UserGroupEditor.vue?vue&type=template&id=536bacce




var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "cass-users-and-groups",
    attrs: {
      "id": "user-groups"
    }
  }, [_c('div', {
    staticClass: "section"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "columns is-mobile is-multiline"
  }, [_c('div', {
    staticClass: "column is-narrow is-hidden-touch"
  }, [_c('div', {
    staticClass: "cass-left-panel"
  }, [_c('div', {
    staticClass: "cass-left-panel---container"
  }, [_c('h3', {
    staticClass: "title is-size-4 is-family-primary"
  }, [_vm._v(" My User Groups ")]), _c('div', {
    staticClass: "buttons"
  }, [_c('div', {
    staticClass: "button is-rounded is-primary is-small",
    attrs: {
      "disabled": !_vm.amLoggedIn,
      "title": _vm.getCreateUserGroupButtonTitle
    },
    on: {
      "click": function click($event) {
        return _vm.createNewUserGroup(null);
      }
    }
  }, [_vm._m(0), _c('span', [_vm._v(" create new group ")])])]), _c('cass-panel', [_c('cass-panel-item', {
    key: "all-members",
    attrs: {
      "depth": 0,
      "label": "Member List",
      "nodes": [],
      "id": "all-members"
    },
    on: {
      "showDetails": _vm.showMemberListView
    }
  }), _vm._l(_vm.userGroupDisplayList, function (group) {
    return _c('cass-panel-item', {
      key: group,
      attrs: {
        "depth": 0,
        "label": group.name,
        "nodes": group.subGroups,
        "id": group.id
      },
      on: {
        "showDetails": _vm.showGroupDetailsById
      }
    });
  })], 2)], 1)])]), _c('div', {
    staticClass: "column is-12 is-hidden-desktop"
  }, [_c('cass-dropdown', {
    attrs: {
      "label": _vm.currentUserGroupName,
      "active": _vm.groupsDropdownActive
    },
    on: {
      "closeDropdown": function closeDropdown($event) {
        _vm.groupsDropdownActive = false;
      },
      "click": function click($event) {
        _vm.groupsDropdownActive = true;
      },
      "showDropdown": function showDropdown($event) {
        _vm.groupsDropdownActive = true;
      }
    }
  }, [_c('cass-dropdown-item', {
    key: "all-members",
    attrs: {
      "depth": 0,
      "label": "Member List",
      "nodes": [],
      "id": "all-members"
    },
    on: {
      "showDetails": _vm.showMemberListView
    }
  }), _vm._l(_vm.userGroupDisplayList, function (group) {
    return _c('cass-dropdown-item', {
      key: group,
      attrs: {
        "depth": 0,
        "label": _vm.truncateString(group.name, 40),
        "nodes": group.subGroups,
        "id": group.id
      },
      on: {
        "showDetails": _vm.showGroupDetailsById
      }
    });
  })], 2)], 1), _c('div', {
    staticClass: "column"
  }, [_c('div', {
    staticClass: "px-2"
  }, [_vm.viewMode === 'memberList' ? _c('div', [_c('h3', {
    staticClass: "title is-size-1 is-family-secondary"
  }, [_vm._v(" All Group Members ")]), _c('p', [_vm._v(" A view of all members within your groups and sub-groups. Click a group name to view the group details. ")]), _vm.allGroupMembersList.length === 0 ? _c('div', [_vm._m(1)]) : _vm._e(), _vm.allGroupMembersList.length > 0 ? _c('div', {}, [_c('div', {
    staticClass: "table-container"
  }, [_c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_vm._m(2), _c('tbody', _vm._l(_vm.allGroupMembersList, function (member, memberIdx) {
    return _c('tr', {
      key: memberIdx
    }, [_c('th', [_vm._v(" " + _vm._s(member.name) + " ")]), _c('td', [_vm._v(" " + _vm._s(member.email) + " ")]), _c('td', [member.managerOf.length > 0 ? _c('div', [_c('b', [_vm._v("Manager of")]), _c('br'), _vm._l(member.managerOf, function (memMgrOf, memMgrOfIdx) {
      return _c('span', [memMgrOfIdx > 0 ? _c('span', [_vm._v(", ")]) : _vm._e(), _c('a', {
        on: {
          "click": function click($event) {
            return _vm.showGroupDetailsById(memMgrOf.id);
          }
        }
      }, [_vm._v(" " + _vm._s(memMgrOf.name) + " ")])]);
    })], 2) : _vm._e(), member.memberOf.length > 0 ? _c('div', [_c('b', [_vm._v("Member of")]), _c('br'), _vm._l(member.memberOf, function (memMemOf, memMemOfIdx) {
      return _c('span', [memMemOfIdx > 0 ? _c('span', [_vm._v(", ")]) : _vm._e(), _c('a', {
        on: {
          "click": function click($event) {
            return _vm.showGroupDetailsById(memMemOf.id);
          }
        }
      }, [_vm._v(" " + _vm._s(memMemOf.name) + " ")])]);
    })], 2) : _vm._e()])]);
  }), 0)])])]) : _vm._e()]) : _vm._e(), _vm.viewMode === 'groupDetail' ? _c('div', [_vm.currentUserGroupLineage && _vm.currentUserGroupLineage.length > 1 ? _c('nav', {
    staticClass: "breadcrumb pb-2",
    attrs: {
      "aria-label": "breadcrumbs"
    }
  }, [_c('ul', _vm._l(_vm.currentUserGroupLineage, function (lineageObj) {
    return _c('li', {
      key: lineageObj.id
    }, [_c('a', {
      on: {
        "click": function click($event) {
          return _vm.showGroupDetailsById(lineageObj.id);
        }
      }
    }, [_vm._v(" " + _vm._s(lineageObj.name) + " ")])]);
  }), 0)]) : _vm._e(), _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-8"
  }, [_c('h2', {
    staticClass: "is-size-1 is-family-secondary"
  }, [_vm._v(" Group Details ")]), !_vm.isEditingCurrentGroupName ? _c('div', {
    staticClass: "columns is-multiline is-mobile"
  }, [_vm._m(3), _c('div', {
    staticClass: "column pt-0"
  }, [_c('h3', {
    staticClass: "subtitle is-size-3"
  }, [_vm._v(" " + _vm._s(_vm.currentUserGroupName) + " ")]), _vm.currentUserGroupName.length > 60 ? _c('p', {
    staticClass: "help is-danger"
  }, [_vm._v(" Group name length max is 60 characters. Please choose a shorter name ")]) : _vm._e()]), _c('div', {
    staticClass: "column is-narrow"
  }, [_vm.currentUserGroupIsManager ? _c('span', {
    staticClass: "icon is-size-7 users-edit-icon",
    on: {
      "click": function click($event) {
        _vm.isEditingCurrentGroupName = true;
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-pencil-alt has-text-dark"
  })]) : _vm._e()])]) : _vm._e(), _vm.isEditingCurrentGroupName ? _c('div', {
    staticClass: "pb-2"
  }, [_c('div', {
    staticClass: "field"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("Group Name")]), _c('p', {
    staticClass: "control is-expanded"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.currentUserGroupName,
      expression: "currentUserGroupName"
    }],
    staticClass: "input",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.currentUserGroupName
    },
    on: {
      "keypress": _vm.setCurrentUserGroupAsChanged,
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.currentUserGroupName = $event.target.value;
      }
    }
  })]), _vm.currentUserGroupName.length > 60 ? _c('p', {
    staticClass: "help is-danger"
  }, [_vm._v(" Group name length max is 60 characters. Please choose a shorter name ")]) : _vm._e()]), _c('span', {
    staticClass: "button is-primary is-rounded is-small is-outlined",
    attrs: {
      "disabled": _vm.currentUserGroupName.length > 60
    },
    on: {
      "click": function click($event) {
        _vm.isEditingCurrentGroupName = false;
      }
    }
  }, [_vm._v(" done editing ")])]) : _vm._e(), _vm.currentUserGroupNameInvalid ? _c('div', {
    staticClass: "field has-text-danger"
  }, [_c('div', {
    staticClass: "label has-text-danger"
  }, [_vm._v(" Group name is required ")])]) : _vm._e(), _c('div', {
    staticClass: "description pb-2"
  }, [!_vm.isEditingCurrentGroupDescription ? _c('div', [_c('div', {
    staticClass: "columns is-multiline is-mobile"
  }, [_vm._m(4), _c('div', {
    staticClass: "column"
  }, [_vm.currentUserGroupDescription && _vm.currentUserGroupDescription.trim().length > 0 ? _c('div', {
    class: _vm.showMore && _vm.currentUserGroupDescription.trim().length > 300 ? 'cass__user-groups--description' : 'cass__user-groups--description-overflow'
  }, [_vm.showMore ? _c('span', [_vm._v(" " + _vm._s(_vm.currentUserGroupDescription) + " ")]) : _c('span', [_vm._v(" " + _vm._s(_vm.currentUserGroupDescription.trim(0, 300)) + " ")]), _vm.showMore && _vm.currentUserGroupDescription.trim().length > 300 ? _c('span', {
    staticClass: "button is-small is-text has-text-primary",
    attrs: {
      "title": "Show more"
    },
    on: {
      "click": function click($event) {
        _vm.showMore = false;
      }
    }
  }, [_c('b', [_vm._v("hide")])]) : _vm.currentUserGroupDescription.trim().length > 300 ? _c('span', {
    staticClass: "button is-small is-text has-text-primary",
    attrs: {
      "title": "Show more"
    },
    on: {
      "click": function click($event) {
        _vm.showMore = true;
      }
    }
  }, [_c('b', [_vm._v("...")])]) : _vm._e()]) : _c('div', [_c('i', [_vm._v("No description")])])]), _c('div', {
    staticClass: "column is-narrow"
  }, [_vm.currentUserGroupIsManager ? _c('span', {
    staticClass: "icon",
    on: {
      "click": function click($event) {
        _vm.isEditingCurrentGroupDescription = true;
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-pencil-alt is-size-7 has-text-dark"
  })]) : _vm._e()])])]) : _vm._e(), _vm.isEditingCurrentGroupDescription ? _c('div', {
    staticClass: "pt-2"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("Group Description")]), _c('div', {
    staticClass: "field"
  }, [_c('p', {
    staticClass: "control is-expanded"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.currentUserGroupDescription,
      expression: "currentUserGroupDescription"
    }],
    staticClass: "textarea",
    attrs: {
      "type": "text",
      "rows": 3
    },
    domProps: {
      "value": _vm.currentUserGroupDescription
    },
    on: {
      "keyup": _vm.setCurrentUserGroupAsChanged,
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.currentUserGroupDescription = $event.target.value;
      }
    }
  })])]), _c('div', {
    staticClass: "buttons"
  }, [_c('span', {
    staticClass: "button is-rounded is-primary is-small is-outlined",
    class: _vm.currentUserGroupChanged ? '' : 'is-disabled',
    attrs: {
      "disabled": !_vm.currentUserGroupChanged
    },
    on: {
      "click": function click($event) {
        _vm.isEditingCurrentGroupDescription = false;
      }
    }
  }, [_vm._v(" done editing ")])])]) : _vm._e(), _vm.currentUserGroupDescriptionInvalid ? _c('div', {
    staticClass: "field has-text-danger"
  }, [_c('div', {
    staticClass: "label has-text-danger"
  }, [_vm._v(" Group description is required ")])]) : _vm._e()])]), _c('div', {
    staticClass: "column is-1"
  }), _c('div', {
    staticClass: "column is-3 pt-3 pr-3"
  }, [_c('div', {
    staticClass: "columns is-multiline px-2"
  }, [_vm.currentUserGroupIsManager ? _c('div', {
    staticClass: "cass-group--actions"
  }, [_c('h5', {
    staticClass: "title is-size-5"
  }, [_vm._v(" Group actions ")]), _vm.currentUserGroupIsManager ? _c('div', {
    staticClass: "button my-1 is-small is-rounded is-small is-fullwidth is-primary",
    attrs: {
      "title": "Add group members"
    },
    on: {
      "click": _vm.showAddGroupMembersModal
    }
  }, [_vm._m(5), _c('span', [_vm._v(" member ")])]) : _vm._e(), _vm.currentUserGroupIsManager && _vm.currentUserGroupChanged ? _c('div', {
    staticClass: "button is-rounded my-1 is-fullwidth is-primary is-small",
    class: _vm.currentUserGroupIsManager && _vm.currentUserGroupChanged ? '' : 'is-disabled',
    attrs: {
      "disabled": !_vm.currentUserGroupChanged,
      "title": "Save group"
    },
    on: {
      "click": _vm.saveCurrentUserGroup
    }
  }, [_vm._m(6), _c('span', [_vm._v(" save ")])]) : _vm._e(), _vm.currentUserGroupIsManager && _vm.currentUserGroupChanged ? _c('div', {
    staticClass: "button is-fullwidth my-1 is-outlined is-rounded is-small",
    class: _vm.currentUserGroupIsManager && _vm.currentUserGroupChanged ? '' : 'is-disbaled',
    attrs: {
      "disabled": !_vm.currentUserGroupChanged,
      "title": "Cancel group changes"
    },
    on: {
      "click": _vm.cancelCurrentUserGroupChanges
    }
  }, [_vm._m(7), _c('span', [_vm._v(" Discard ")])]) : _vm._e(), _vm.currentUserGroupIsManager && !_vm.currentUserGroupIsNewGroup ? _c('div', {
    staticClass: "button my-1 is-fullwidth is-rounded is-primary is-small",
    attrs: {
      "title": "Create sub-group"
    },
    on: {
      "click": _vm.createSubGroupForCurrentUserGroup
    }
  }, [_vm._m(8), _c('span', [_vm._v(" sub-group ")])]) : _vm._e(), _vm.currentUserGroupIsManager && !_vm.currentUserGroupIsNewGroup ? _c('div', {
    staticClass: "button my-1 is-outlined is-fullwidth is-rounded is-small is-danger",
    attrs: {
      "title": "Delete group and sub-groups"
    },
    on: {
      "click": _vm.showDeleteCurrentUserGroupConfirmModal
    }
  }, [_vm._m(9), _c('span', [_vm._v(" Delete ")])]) : _vm._e()]) : _vm._e()])])]), _c('div', {
    staticClass: "pt-3"
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column"
  }, [_c('span', {
    staticClass: "subtitle is-size-4"
  }, [_vm._v(" " + _vm._s(_vm.currentUserGroupName) + " Members ")])])]), _c('div', {
    staticClass: "table-container"
  }, [_c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_c('thead', [_c('tr', [_c('th', [_vm._v(" name ")]), _c('th', [_vm._v(" email ")]), _c('th', [_vm._v(" role ")]), _vm.currentUserGroupIsManager ? _c('th') : _vm._e()])]), _c('tbody', [_vm._l(_vm.currentUserGroupManagers, function (manager, managerIdx) {
    return _c('tr', {
      key: managerIdx + '_mgr'
    }, [_c('th', [_vm._v(" " + _vm._s(manager.name) + " ")]), _c('td', [_vm._v(" " + _vm._s(manager.email) + " ")]), _vm._m(10, true), _vm.currentUserGroupIsManager ? _c('td', [!_vm.areAnyIdentitiesThisPerson(manager) ? _c('div', {
      staticClass: "buttons is-right"
    }, [_c('div', {
      staticClass: "button is-small is-outlined is-primary",
      attrs: {
        "title": "Change role to member"
      },
      on: {
        "click": function click($event) {
          _vm.changeManagerToMember(manager.shortId());
        }
      }
    }, [_vm._m(11, true), _c('span', [_vm._v(" change role ")])]), _vm.isPersonRemovableFromCurrentUserGroup(manager.shortId()) ? _c('div', {
      staticClass: "button is-small is-outlined is-warning",
      attrs: {
        "title": "Remove manager"
      },
      on: {
        "click": function click($event) {
          _vm.removeMemberFromCurrentUserGroup(manager.shortId());
        }
      }
    }, [_vm._m(12, true)]) : _c('button', {
      staticClass: "button is-small is-outlined is-disabled",
      attrs: {
        "disabled": "",
        "title": "Cannot remove: member of sub-group you do not manage."
      }
    }, [_vm._m(13, true)])]) : _vm._e()]) : _vm._e()]);
  }), _vm._l(_vm.currentUserGroupMembers, function (member, memberIdx) {
    return _c('tr', {
      key: memberIdx + '_mem'
    }, [_c('th', [_vm._v(" " + _vm._s(member.name) + " ")]), _c('td', [_vm._v(" " + _vm._s(member.email) + " ")]), _c('td', [_vm._v(" member ")]), _vm.currentUserGroupIsManager ? _c('td', [_c('div', {
      staticClass: "buttons is-right"
    }, [_c('div', {
      staticClass: "button is-small is-outlined is-primary",
      attrs: {
        "title": "Change role to manager"
      },
      on: {
        "click": function click($event) {
          _vm.changeMemberToManager(member.shortId());
        }
      }
    }, [_vm._m(14, true), _c('span', [_vm._v(" change role ")])]), _vm.isPersonRemovableFromCurrentUserGroup(member.shortId()) ? _c('div', {
      staticClass: "button is-small is-outlined is-warning",
      attrs: {
        "title": "Remove member"
      },
      on: {
        "click": function click($event) {
          _vm.removeMemberFromCurrentUserGroup(member.shortId());
        }
      }
    }, [_vm._m(15, true)]) : _c('button', {
      staticClass: "button is-small is-outlined is-disabled",
      attrs: {
        "disabled": "",
        "title": "Cannot remove: member of sub-group you do not manage."
      }
    }, [_vm._m(16, true)])])]) : _vm._e()]);
  })], 2)])])])]) : _vm._e()])])])])]), _c('modal-template', {
    attrs: {
      "size": "small",
      "active": _vm.showConfirmLoseChangesModal
    },
    on: {
      "close": _vm.cancelLoseChanges
    }
  }, [_c('template', {
    slot: "modal-header"
  }, [_vm._v(" Discard Unsaved Changes? ")]), _c('template', {
    slot: "modal-body"
  }, [_vm._v(" You have unsaved changes. Cancel to return to group and save changes, or confirm to discard changes. ")]), _c('template', {
    slot: "modal-foot"
  }, [_vm.toRoute !== '' ? _c('button', {
    staticClass: "button is-primary is-outlined",
    on: {
      "click": _vm.confirmLoseChangesAndNav
    }
  }, [_vm._v(" Confirm ")]) : _c('button', {
    staticClass: "button is-primary is-outlined",
    on: {
      "click": _vm.confirmLoseChanges
    }
  }, [_vm._v(" Confirm ")]), _c('button', {
    staticClass: "button is-info",
    on: {
      "click": _vm.cancelLoseChanges
    }
  }, [_vm._v(" cancel ")])])], 2), _c('modal-template', {
    attrs: {
      "header": false,
      "active": _vm.userGroupBusy
    }
  }, [_c('template', {
    slot: "modal-header"
  }, [_vm._v(" Processing Request ")]), _c('template', {
    slot: "modal-body"
  }, [_c('div', {
    staticClass: "modal-content has-text-centered"
  }, [_c('span', {
    staticClass: "icon is-large has-text-center has-text-link"
  }, [_c('i', {
    staticClass: "fas fa-2x fa-spinner is-info fa-pulse"
  })])])])], 2), _c('modal-template', {
    attrs: {
      "active": _vm.showAddMemberModal
    },
    on: {
      "close": _vm.closeAddGroupMemberModal
    }
  }, [_c('template', {
    slot: "modal-header"
  }, [_c('p', {
    staticClass: "is-size-3 modal-card-title has-text-white"
  }, [_vm._v(" Add members to '" + _vm._s(_vm.currentUserGroupName) + "' ")])]), _c('template', {
    slot: "modal-body"
  }, [!(_vm.filteredAvailablePersonsForMembership.length === 0 && _vm.addMemberPersonFilter === '') ? _c('div', {
    staticClass: "field"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: _vm.addMemberPersonFilter,
      expression: "addMemberPersonFilter"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "search for person..."
    },
    domProps: {
      "value": _vm.addMemberPersonFilter
    },
    on: {
      "input": function input($event) {
        if ($event.target.composing) return;
        _vm.addMemberPersonFilter = $event.target.value;
      }
    }
  })]) : _vm._e(), _vm.filteredAvailablePersonsForMembership.length === 0 && _vm.addMemberPersonFilter === '' ? _c('div', [_c('i', {
    staticClass: "fa fa-info-circle"
  }), _vm._v(" No group members available. Users must be managers or members of any parent groups in order to be available for sub-groups. ")]) : _vm._e(), _vm.filteredAvailablePersonsForMembership.length > 0 ? _c('div', [_c('h4', {
    staticClass: "header is-size-3"
  }, [_vm._v(" Available members ")]), _c('div', {
    staticClass: "table-container"
  }, [_c('table', {
    staticClass: "table is-hoverable is-fullwidth"
  }, [_c('thead', [_c('tr', [_c('th', {
    attrs: {
      "title": "Add as member"
    }
  }, [_c('i', {
    staticClass: "fa fa-user"
  })]), _c('th', {
    attrs: {
      "title": "Add as manager"
    }
  }, [_c('i', {
    staticClass: "fa fa-user-shield"
  })]), _c('th', [_vm._v("name")]), _c('th', [_vm._v("email")])])]), _c('tbody', _vm._l(_vm.filteredAvailablePersonsForMembership, function (prs, index) {
    return _c('tr', {
      key: index
    }, [_c('th', [_c('div', {
      staticClass: "checkbox"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.selectedNewMembers,
        expression: "selectedNewMembers"
      }],
      attrs: {
        "id": prs.shortId(),
        "name": "prs.shortId()",
        "type": "checkbox",
        "title": "Add as member"
      },
      domProps: {
        "value": prs.shortId(),
        "checked": Array.isArray(_vm.selectedNewMembers) ? _vm._i(_vm.selectedNewMembers, prs.shortId()) > -1 : _vm.selectedNewMembers
      },
      on: {
        "change": [function ($event) {
          var $$a = _vm.selectedNewMembers,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;
          if (Array.isArray($$a)) {
            var $$v = prs.shortId(),
              $$i = _vm._i($$a, $$v);
            if ($$el.checked) {
              $$i < 0 && (_vm.selectedNewMembers = $$a.concat([$$v]));
            } else {
              $$i > -1 && (_vm.selectedNewMembers = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
            }
          } else {
            _vm.selectedNewMembers = $$c;
          }
        }, function ($event) {
          _vm.removeFromSelectedNewManagers(prs.shortId());
        }]
      }
    })])]), _c('th', [_c('div', {
      staticClass: "checkbox"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.selectedNewManagers,
        expression: "selectedNewManagers"
      }],
      attrs: {
        "id": prs.shortId(),
        "name": "prs.shortId()",
        "type": "checkbox",
        "title": "Add as manager"
      },
      domProps: {
        "value": prs.shortId(),
        "checked": Array.isArray(_vm.selectedNewManagers) ? _vm._i(_vm.selectedNewManagers, prs.shortId()) > -1 : _vm.selectedNewManagers
      },
      on: {
        "change": [function ($event) {
          var $$a = _vm.selectedNewManagers,
            $$el = $event.target,
            $$c = $$el.checked ? true : false;
          if (Array.isArray($$a)) {
            var $$v = prs.shortId(),
              $$i = _vm._i($$a, $$v);
            if ($$el.checked) {
              $$i < 0 && (_vm.selectedNewManagers = $$a.concat([$$v]));
            } else {
              $$i > -1 && (_vm.selectedNewManagers = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
            }
          } else {
            _vm.selectedNewManagers = $$c;
          }
        }, function ($event) {
          _vm.removeFromSelectedNewMembers(prs.shortId());
        }]
      }
    })])]), _c('td', [_vm._v(" " + _vm._s(prs.getName()) + " ")]), _c('td', [_vm._v(" " + _vm._s(prs.email) + " ")])]);
  }), 0)])])]) : _vm._e()]), _c('template', {
    slot: "modal-foot"
  }, [_vm.selectedNewMembers.length > 0 || _vm.selectedNewManagers.length > 0 ? _c('div', {
    staticClass: "button is-outlined is-primary is-small",
    attrs: {
      "title": "Apply new members"
    },
    on: {
      "click": _vm.applySelectedNewMembersToCurrentUserGroup
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-save"
  })]), _c('span', [_vm._v(" apply ")])]) : _vm._e(), _c('div', {
    staticClass: "button is-outlined is-small",
    attrs: {
      "title": "Cancel add new members"
    },
    on: {
      "click": _vm.closeAddGroupMemberModal
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-times"
  })]), _c('span', [_vm._v(" cancel ")])])])], 2), _c('modal-template', {
    attrs: {
      "active": _vm.showConfirmDeleteUserGroupModal
    },
    on: {
      "close": _vm.closeDeleteGroupConfirmModal
    }
  }, [_c('template', {
    slot: "modal-header"
  }, [_vm._v(" Delete User Group? ")]), _c('template', {
    slot: "modal-body"
  }, [_vm._v(" Are you sure you wish to delete the user group "), _c('b', [_vm._v("'" + _vm._s(_vm.currentUserGroupName) + "'")]), _vm._v("? "), _vm.deleteConfirmNumberOfSubGroups > 0 ? _c('div', {
    staticClass: "field has-text-danger pt-4"
  }, [_c('div', {
    staticClass: "label has-text-danger"
  }, [_c('i', {
    staticClass: "fa fa-exclamation-triangle"
  }), _vm._v(" Warning! Deleting this group will also delete all of its sub-groups ("), _c('b', [_vm._v(_vm._s(_vm.deleteConfirmNumberOfSubGroups))]), _vm._v("). This is non-reversible. ")])]) : _vm._e()]), _c('template', {
    slot: "modal-foot"
  }, [_c('div', {
    staticClass: "button is-outlined",
    attrs: {
      "title": "Cancel user group delete"
    },
    on: {
      "click": _vm.closeDeleteGroupConfirmModal
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-times"
  })]), _c('span', [_vm._v(" cancel ")])]), _c('div', {
    staticClass: "button is-outlined is-warning",
    attrs: {
      "title": "Confirm user group delete"
    },
    on: {
      "click": _vm.deleteCurrentUserGroupAndSubGroups
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-trash"
  })]), _c('span', [_vm._v(" delete ")])])])], 2)], 1);
};
var staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('h3', {
    staticClass: "title is-size-5"
  }, [_c('i', {
    staticClass: "fa fa-info-circle"
  }), _vm._v(" No user groups available ")]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('thead', [_c('tr', [_c('th', [_vm._v(" name ")]), _c('th', [_vm._v(" email ")]), _c('th', [_vm._v(" membership ")])])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "column is-12 pb-0"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v("Group name")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "column is-12 pb-0"
  }, [_c('label', {
    staticClass: "label"
  }, [_vm._v(" Group Description ")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-save"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-undo"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-trash"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('td', [_c('b', [_vm._v("manager")])]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-arrow-down"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-trash"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-trash"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-arrow-up"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-trash"
  })]);
}, function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-trash"
  })]);
}];

// CONCATENATED MODULE: ./src/views/usersGroups/UserGroupEditor.vue?vue&type=template&id=536bacce

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createForOfIteratorHelper.js
var createForOfIteratorHelper = __webpack_require__("b85c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__("14d9");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__("a4d3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__("e01a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.sort.js
var es_array_sort = __webpack_require__("4e82");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.search.js
var es_string_search = __webpack_require__("841c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"fffa3e18-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Panel.vue?vue&type=template&id=ac90d998
var Panelvue_type_template_id_ac90d998_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "cass-users-and-groups__panel"
  }, [_c('nav', [_vm._t("default")], 2)]);
};
var Panelvue_type_template_id_ac90d998_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/Panel.vue?vue&type=template&id=ac90d998

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Panel.vue?vue&type=script&lang=js
/* harmony default export */ var Panelvue_type_script_lang_js = ({
  name: 'CassPanel'
});
// CONCATENATED MODULE: ./src/components/Panel.vue?vue&type=script&lang=js
 /* harmony default export */ var components_Panelvue_type_script_lang_js = (Panelvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/Panel.vue?vue&type=style&index=0&id=ac90d998&prod&lang=scss
var Panelvue_type_style_index_0_id_ac90d998_prod_lang_scss = __webpack_require__("ed63");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/Panel.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Panelvue_type_script_lang_js,
  Panelvue_type_template_id_ac90d998_render,
  Panelvue_type_template_id_ac90d998_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Panel = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"fffa3e18-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PanelItem.vue?vue&type=template&id=21c532fe

var PanelItemvue_type_template_id_21c532fe_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', [_c('a', {
    staticClass: "panel-block",
    style: {
      transform: _vm.indent,
      width: _vm.calcWidth
    }
  }, [_c('span', {
    on: {
      "click": _vm.showDetails
    }
  }, [_vm._v(" " + _vm._s(_vm.label) + " ")]), _vm.nodes.length > 0 ? _c('span', {
    staticClass: "icon is-pulled-right",
    on: {
      "click": function click($event) {
        _vm.showChildren = !_vm.showChildren;
      }
    }
  }, [_vm.showChildren ? _c('i', {
    staticClass: "fa fa-chevron-down"
  }) : _c('i', {
    staticClass: "fa fa-chevron-right"
  })]) : _vm._e()]), _vm._l(_vm.nodes, function (node) {
    return _c('cass-panel-item', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showChildren,
        expression: "showChildren"
      }],
      key: node,
      attrs: {
        "depth": _vm.depth + 1,
        "id": node.id,
        "nodes": node.subGroups,
        "label": node.name
      },
      on: {
        "showDetails": _vm.showDetailsChild
      }
    });
  })], 2);
};
var PanelItemvue_type_template_id_21c532fe_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/PanelItem.vue?vue&type=template&id=21c532fe

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/PanelItem.vue?vue&type=script&lang=js

/* harmony default export */ var PanelItemvue_type_script_lang_js = ({
  name: 'CassPanelItem',
  props: ['nodes', 'label', 'depth', 'id'],
  components: {
    CassPanelItem: PanelItem
  },
  data: function data() {
    return {
      showChildren: false
    };
  },
  computed: {
    indent: function indent() {
      return "translate(".concat(this.depth * 16, "px)");
    },
    calcWidth: function calcWidth() {
      return "calc(100% - ".concat(this.depth * 16, "px) !important");
    }
  },
  methods: {
    showDetails: function showDetails() {
      this.showChildren = true;
      this.$emit('showDetails', this.id);
    },
    showDetailsChild: function showDetailsChild(id) {
      this.$emit('showDetails', id);
    }
  }
});
// CONCATENATED MODULE: ./src/components/PanelItem.vue?vue&type=script&lang=js
 /* harmony default export */ var components_PanelItemvue_type_script_lang_js = (PanelItemvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/PanelItem.vue?vue&type=style&index=0&id=21c532fe&prod&lang=css
var PanelItemvue_type_style_index_0_id_21c532fe_prod_lang_css = __webpack_require__("b141");

// CONCATENATED MODULE: ./src/components/PanelItem.vue






/* normalize component */

var PanelItem_component = Object(componentNormalizer["a" /* default */])(
  components_PanelItemvue_type_script_lang_js,
  PanelItemvue_type_template_id_21c532fe_render,
  PanelItemvue_type_template_id_21c532fe_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var PanelItem = (PanelItem_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"fffa3e18-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Dropdown.vue?vue&type=template&id=740590b3
var Dropdownvue_type_template_id_740590b3_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    directives: [{
      name: "click-outside",
      rawName: "v-click-outside",
      value: _vm.closeDropdown,
      expression: "closeDropdown"
    }],
    staticClass: "dropdown cass-user-group--dropdown",
    class: _vm.active ? 'is-active' : ''
  }, [_c('div', {
    staticClass: "dropdown-trigger",
    on: {
      "click": function click($event) {
        return _vm.$emit('showDropdown');
      }
    }
  }, [_c('button', {
    staticClass: "button is-fullwidth is-large",
    attrs: {
      "aria-haspopup": "true",
      "aria-controls": "dropdown-menu"
    }
  }, [_vm.label ? _c('span', {
    staticClass: "dropdown-menu--item"
  }, [_vm._v(_vm._s(_vm.label))]) : _c('span', [_vm._v("All Group Members")]), _vm._m(0)])]), _c('div', {
    staticClass: "dropdown-menu",
    attrs: {
      "id": "dropdown-menu",
      "role": "menu"
    }
  }, [_c('div', {
    staticClass: "dropdown-content"
  }, [_vm._t("default")], 2)])]);
};
var Dropdownvue_type_template_id_740590b3_staticRenderFns = [function () {
  var _vm = this,
    _c = _vm._self._c;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fas fa-angle-down",
    attrs: {
      "aria-hidden": "true"
    }
  })]);
}];

// CONCATENATED MODULE: ./src/components/Dropdown.vue?vue&type=template&id=740590b3

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Dropdown.vue?vue&type=script&lang=js
/* harmony default export */ var Dropdownvue_type_script_lang_js = ({
  name: 'CassDropdown',
  props: ['active', 'label'],
  methods: {
    closeDropdown: function closeDropdown() {
      this.$emit('closeDropdown');
    }
  }
});
// CONCATENATED MODULE: ./src/components/Dropdown.vue?vue&type=script&lang=js
 /* harmony default export */ var components_Dropdownvue_type_script_lang_js = (Dropdownvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/Dropdown.vue?vue&type=style&index=0&id=740590b3&prod&lang=scss
var Dropdownvue_type_style_index_0_id_740590b3_prod_lang_scss = __webpack_require__("8c8e");

// CONCATENATED MODULE: ./src/components/Dropdown.vue






/* normalize component */

var Dropdown_component = Object(componentNormalizer["a" /* default */])(
  components_Dropdownvue_type_script_lang_js,
  Dropdownvue_type_template_id_740590b3_render,
  Dropdownvue_type_template_id_740590b3_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Dropdown = (Dropdown_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"fffa3e18-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/DropdownItem.vue?vue&type=template&id=37afeae8

var DropdownItemvue_type_template_id_37afeae8_render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "cass-dropdown--item"
  }, [_c('a', {
    staticClass: "dropdown-item",
    on: {
      "click": _vm.showDetails
    }
  }, [_vm._v(" " + _vm._s(_vm.label) + " ")]), _vm._l(_vm.nodes, function (node) {
    return _c('cass-dropdown-item', {
      key: node,
      attrs: {
        "depth": _vm.depth + 1,
        "id": node.id,
        "nodes": node.subGroups,
        "label": node.name
      },
      on: {
        "showDetails": _vm.showDetailsChild
      }
    });
  })], 2);
};
var DropdownItemvue_type_template_id_37afeae8_staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/DropdownItem.vue?vue&type=template&id=37afeae8

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/DropdownItem.vue?vue&type=script&lang=js

/* harmony default export */ var DropdownItemvue_type_script_lang_js = ({
  name: 'CassDropdownItem',
  components: {
    CassDropdownItem: DropdownItem
  },
  props: ['nodes', 'label', 'depth', 'id'],
  methods: {
    showDetailsChild: function showDetailsChild(id) {
      this.$emit('showDetails', id);
    },
    showDetails: function showDetails() {
      this.showChildren = true;
      this.$emit('showDetails', this.id);
    }
  }
});
// CONCATENATED MODULE: ./src/components/DropdownItem.vue?vue&type=script&lang=js
 /* harmony default export */ var components_DropdownItemvue_type_script_lang_js = (DropdownItemvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/DropdownItem.vue?vue&type=style&index=0&id=37afeae8&prod&lang=css
var DropdownItemvue_type_style_index_0_id_37afeae8_prod_lang_css = __webpack_require__("9fd8");

// CONCATENATED MODULE: ./src/components/DropdownItem.vue






/* normalize component */

var DropdownItem_component = Object(componentNormalizer["a" /* default */])(
  components_DropdownItemvue_type_script_lang_js,
  DropdownItemvue_type_template_id_37afeae8_render,
  DropdownItemvue_type_template_id_37afeae8_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DropdownItem = (DropdownItem_component.exports);
// EXTERNAL MODULE: ./src/mixins/cassUtil.js
var cassUtil = __webpack_require__("6d79");

// EXTERNAL MODULE: ./src/components/modalContent/ModalTemplate.vue + 4 modules
var ModalTemplate = __webpack_require__("af07");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/usersGroups/UserGroupEditor.vue?vue&type=script&lang=js





















/* harmony default export */ var UserGroupEditorvue_type_script_lang_js = ({
  name: 'UserGroupEditor',
  mixins: [cassUtil["a" /* cassUtil */]],
  data: function data() {
    return {
      toId: '',
      toRoute: '',
      showConfirmLoseChangesModal: false,
      displayLength: 300,
      showMore: false,
      groupsDropdownActive: false,
      GROUP_SEARCH_SIZE: 10000,
      PERSON_SEARCH_SIZE: 10000,
      userGroupBusy: false,
      currentUserGroup: {},
      currentUserGroupId: '',
      currentUserGroupNeedsRekey: false,
      currentUserGroupIsManager: false,
      currentUserGroupManagers: [],
      currentUserGroupMembers: [],
      currentUserGroupName: '',
      currentUserGroupDescription: '',
      currentUserGroupLineage: [],
      currentUserGroupIsNewGroup: false,
      currentUserGroupChanged: false,
      isEditingCurrentGroupName: false,
      isEditingCurrentGroupDescription: false,
      currentUserGroupInvalid: false,
      currentUserGroupNameInvalid: false,
      currentUserGroupDescriptionInvalid: false,
      membersToRemove: [],
      userGroupsToSave: [],
      numberOfUserGroupsToSave: 0,
      numberOfUserGroupsSaved: 0,
      userGroupsToDelete: [],
      numberOfUserGroupsToDelete: 0,
      numberOfUserGroupsDeleted: 0,
      showAddMemberModal: false,
      showConfirmDeleteUserGroupModal: false,
      deleteConfirmNumberOfSubGroups: 0,
      addMemberPersonFilter: '',
      availablePersonsForMembership: [],
      selectedNewMembers: [],
      selectedNewManagers: [],
      allPersonList: [],
      allPersonMap: {},
      allGroupMembersList: [],
      userGroupDisplayList: [],
      userGroupDisplayMap: {},
      userGroupMap: {},
      userGroupIdToShowAfterReload: '',
      viewMode: 'memberList'
    };
  },
  components: {
    CassPanel: Panel,
    CassPanelItem: PanelItem,
    CassDropdown: Dropdown,
    CassDropdownItem: DropdownItem,
    ModalTemplate: ModalTemplate["a" /* default */]
  },
  computed: {
    getCreateUserGroupButtonTitle: function getCreateUserGroupButtonTitle() {
      if (this.amLoggedIn) return '';else return 'Must be logged in';
    },
    filteredAvailablePersonsForMembership: function filteredAvailablePersonsForMembership() {
      var _this = this;
      return this.availablePersonsForMembership.filter(function (person) {
        if (_this.currentUserGroupHasManager(person.shortId()) || _this.currentUserGroupHasMember(person.shortId())) return false;
        return person.getName() && person.getName().toLowerCase().indexOf(_this.addMemberPersonFilter.toLowerCase()) > -1 || person.email && person.email.toLowerCase().indexOf(_this.addMemberPersonFilter.toLowerCase()) > -1;
      });
    }
  },
  beforeRouteLeave: function beforeRouteLeave(to, from, next) {
    if (this.currentUserGroupChanged) {
      this.toRoute = to;
      this.showConfirmLoseChangesModal = true;
    } else {
      next();
    }
  },
  methods: {
    showMemberListView: function showMemberListView() {
      this.currentUserGroupNeedsRekey = false;
      this.currentUserGroupIsManager = false;
      this.isEditingCurrentGroupName = false;
      this.isEditingCurrentGroupDescription = false;
      this.currentUserGroup = {};
      this.currentUserGroupId = '';
      this.currentUserGroupManagers = [];
      this.currentUserGroupMembers = [];
      this.currentUserGroupName = '';
      this.currentUserGroupDescription = '';
      this.currentUserGroupLineage = [];
      this.currentUserGroupIsNewGroup = false;
      this.currentUserGroupChanged = false;
      this.viewMode = "memberList";
    },
    showGroupDetailView: function showGroupDetailView() {
      this.viewMode = "groupDetail";
    },
    setCurrentUserGroupAsChanged: function setCurrentUserGroupAsChanged() {
      this.currentUserGroupChanged = true;
    },
    changeManagerToMember: function changeManagerToMember(personId) {
      this.currentUserGroupManagers = this.currentUserGroupManagers.filter(function (mgr) {
        return mgr.shortId() !== personId;
      });
      this.currentUserGroupMembers.push(this.allPersonMap[personId]);
      this.currentUserGroupChanged = true;
    },
    changeMemberToManager: function changeMemberToManager(personId) {
      this.currentUserGroupMembers = this.currentUserGroupMembers.filter(function (mem) {
        return mem.shortId() !== personId;
      });
      this.currentUserGroupManagers.push(this.allPersonMap[personId]);
      this.currentUserGroupChanged = true;
    },
    closeAddGroupMemberModal: function closeAddGroupMemberModal() {
      this.selectedNewMembers = [];
      this.selectedNewManagers = [];
      this.showAddMemberModal = false;
    },
    getPersonListFromIdList: function getPersonListFromIdList(personIdList) {
      var pl = [];
      var _iterator = Object(createForOfIteratorHelper["a" /* default */])(personIdList),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var pid = _step.value;
          var p = this.allPersonMap[pid];
          if (p) pl.push(p);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return pl;
    },
    removeFromSelectedNewMembers: function removeFromSelectedNewMembers(personId) {
      this.selectedNewMembers = this.selectedNewMembers.filter(function (p) {
        return p !== personId;
      });
    },
    removeFromSelectedNewManagers: function removeFromSelectedNewManagers(personId) {
      this.selectedNewManagers = this.selectedNewManagers.filter(function (p) {
        return p !== personId;
      });
    },
    currentUserGroupHasManager: function currentUserGroupHasManager(personId) {
      var _iterator2 = Object(createForOfIteratorHelper["a" /* default */])(this.currentUserGroupManagers),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var p = _step2.value;
          if (p.shortId().equals(personId)) {
            return true;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return false;
    },
    currentUserGroupHasMember: function currentUserGroupHasMember(personId) {
      var _iterator3 = Object(createForOfIteratorHelper["a" /* default */])(this.currentUserGroupMembers),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var p = _step3.value;
          if (p.shortId().equals(personId)) {
            return true;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      return false;
    },
    buildAvailablePersonsForMembership: function buildAvailablePersonsForMembership() {
      var apl = [];
      if (!this.currentUserGroup.memberOf || !this.userGroupMap[this.currentUserGroup.memberOf]) {
        apl = this.allPersonList;
      } else {
        var parentGroup = this.userGroupMap[this.currentUserGroup.memberOf];
        apl = this.getPersonListFromIdList(parentGroup.employee);
      }
      this.availablePersonsForMembership = apl;
    },
    showAddGroupMembersModal: function showAddGroupMembersModal() {
      this.selectedNewMembers = [];
      this.selectedNewManagers = [];
      this.buildAvailablePersonsForMembership();
      this.addMemberPersonFilter = '';
      this.showAddMemberModal = true;
    },
    removePersonFromMembersToRemoveBuffer: function removePersonFromMembersToRemoveBuffer(personId) {
      this.membersToRemove = this.membersToRemove.filter(function (p) {
        return p !== personId;
      });
    },
    applySelectedNewMembersToCurrentUserGroup: function applySelectedNewMembersToCurrentUserGroup() {
      var _iterator4 = Object(createForOfIteratorHelper["a" /* default */])(this.selectedNewMembers),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var newMemId = _step4.value;
          this.currentUserGroupMembers.push(this.allPersonMap[newMemId]);
          this.removePersonFromMembersToRemoveBuffer(newMemId);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      var _iterator5 = Object(createForOfIteratorHelper["a" /* default */])(this.selectedNewManagers),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var newMgrId = _step5.value;
          this.currentUserGroupManagers.push(this.allPersonMap[newMgrId]);
          this.removePersonFromMembersToRemoveBuffer(newMgrId);
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      this.currentUserGroupChanged = true;
      this.closeAddGroupMemberModal();
    },
    removeMemberFromCurrentUserGroup: function removeMemberFromCurrentUserGroup(personId) {
      this.membersToRemove.push(personId);
      this.currentUserGroupManagers = this.currentUserGroupManagers.filter(function (mgr) {
        return mgr.shortId() !== personId;
      });
      this.currentUserGroupMembers = this.currentUserGroupMembers.filter(function (mem) {
        return mem.shortId() !== personId;
      });
      this.currentUserGroupChanged = true;
    },
    isPersonRemovableFromCurrentUserGroup: function isPersonRemovableFromCurrentUserGroup(personId) {
      // A person can't be removed if he/she is also a member of a sub-group of which the logged in person is not a manager
      // This isn't 100% fool proof but it works for now
      var subGroupIds = this.getSubGroupIdsForUserGroup(this.currentUserGroupId);
      var _iterator6 = Object(createForOfIteratorHelper["a" /* default */])(subGroupIds),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var sgId = _step6.value;
          var ug = this.userGroupMap[sgId];
          if (ug.employee.includes(personId) && !this.isPersonalIdentityAnObjectOwner(ug)) return false;
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      return true;
    },
    closeDeleteGroupConfirmModal: function closeDeleteGroupConfirmModal() {
      this.showConfirmDeleteUserGroupModal = false;
    },
    showDeleteCurrentUserGroupConfirmModal: function showDeleteCurrentUserGroupConfirmModal() {
      this.deleteConfirmNumberOfSubGroups = this.getSubGroupIdsForUserGroup(this.currentUserGroupId).length;
      this.showConfirmDeleteUserGroupModal = true;
    },
    addCurrentUserGroupSubGroupsToGroupsToDelete: function addCurrentUserGroupSubGroupsToGroupsToDelete() {
      var subGroupIds = this.getSubGroupIdsForUserGroup(this.currentUserGroupId);
      var _iterator7 = Object(createForOfIteratorHelper["a" /* default */])(subGroupIds),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var sgid = _step7.value;
          this.userGroupsToDelete.push(this.userGroupMap[sgid]);
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
    },
    checkUserGroupDeleteStatus: function checkUserGroupDeleteStatus() {
      if (this.numberOfUserGroupsDeleted >= this.numberOfUserGroupsToDelete) {
        this.buildUserGroupData();
      } else {
        this.deleteUserGroup(this.numberOfUserGroupsDeleted);
      }
    },
    handleDeleteUserGroupSuccess: function handleDeleteUserGroupSuccess() {
      appLog("Delete user group success...");
      this.numberOfUserGroupsDeleted++;
      this.checkUserGroupDeleteStatus();
    },
    handleDeleteUserGroupFailure: function handleDeleteUserGroupFailure(msg) {
      appLog("Delete user group failure: " + msg);
      this.numberOfUserGroupsDeleted++;
      this.checkUserGroupDeleteStatus();
    },
    deleteUserGroup: function deleteUserGroup(ugIdx) {
      var grp = this.userGroupsToDelete[ugIdx];
      window.repo.deleteRegistered(grp, this.handleDeleteUserGroupSuccess, this.handleDeleteUserGroupFailure);
    },
    deleteCurrentUserGroupAndSubGroups: function deleteCurrentUserGroupAndSubGroups() {
      this.userGroupBusy = true;
      this.showConfirmDeleteUserGroupModal = false;
      this.userGroupsToDelete = [];
      this.numberOfUserGroupsDeleted = 0;
      this.addCurrentUserGroupSubGroupsToGroupsToDelete();
      this.userGroupsToDelete.push(this.currentUserGroup);
      this.numberOfUserGroupsToDelete = this.userGroupsToDelete.length;
      if (this.currentUserGroup.memberOf && this.currentUserGroup.memberOf !== '') {
        this.userGroupIdToShowAfterReload = this.currentUserGroup.memberOf;
      } else this.userGroupIdToShowAfterReload = '';
      this.deleteUserGroup(0);
    },
    setCurrentUserGroupValidationsChecksToValid: function setCurrentUserGroupValidationsChecksToValid() {
      this.currentUserGroupInvalid = false;
      this.currentUserGroupNameInvalid = false;
      this.currentUserGroupDescriptionInvalid = false;
    },
    validateCurrentUserGroupFields: function validateCurrentUserGroupFields() {
      this.setCurrentUserGroupValidationsChecksToValid();
      if (!this.currentUserGroupName || this.currentUserGroupName.trim().equals('')) {
        this.currentUserGroupInvalid = true;
        this.currentUserGroupNameInvalid = true;
      }
      if (!this.currentUserGroupDescription || this.currentUserGroupDescription.trim().equals('')) {
        this.currentUserGroupInvalid = true;
        this.currentUserGroupDescriptionInvalid = true;
      }
    },
    checkUserGroupSaveStatus: function checkUserGroupSaveStatus() {
      if (this.numberOfUserGroupsSaved >= this.numberOfUserGroupsToSave) {
        this.currentUserGroupChanged = false;
        this.buildUserGroupData();
      } else {
        this.saveUserGroup(this.numberOfUserGroupsSaved);
      }
    },
    handleSaveUserGroupSuccess: function handleSaveUserGroupSuccess() {
      appLog("Save user group success...");
      this.numberOfUserGroupsSaved++;
      this.checkUserGroupSaveStatus();
    },
    handleSaveUserGroupFailure: function handleSaveUserGroupFailure(msg) {
      appLog("Save user group failure: " + msg);
      this.numberOfUserGroupsSaved++;
      this.checkUserGroupSaveStatus();
    },
    saveUserGroup: function saveUserGroup(ugIdx) {
      var _this2 = this;
      var grp = this.userGroupsToSave[ugIdx];
      if (this.currentUserGroupNeedsRekey) {
        appLog('Calling group save with rekey: ' + grp.shortId());
        setTimeout(function () {
          grp.rekeyAndSave(_this2.handleSaveUserGroupSuccess, _this2.handleSaveUserGroupFailure, window.repo);
        }, 300);
      } else {
        grp.save(this.handleSaveUserGroupSuccess, this.handleSaveUserGroupFailure, window.repo);
      }
    },
    updateCurrentUserGroupMemberList: function updateCurrentUserGroupMemberList() {
      this.currentUserGroup.employee = [];
      this.currentUserGroup.owner = [];
      this.currentUserGroup.reader = [];
      var _iterator8 = Object(createForOfIteratorHelper["a" /* default */])(this.currentUserGroupManagers),
        _step8;
      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var gm = _step8.value;
          var gmEcPk = this.getPersonEcPk(gm);
          if (gmEcPk) {
            this.currentUserGroup.addEmployee(gm);
            this.currentUserGroup.addOwner(gmEcPk);
          }
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
      var _iterator9 = Object(createForOfIteratorHelper["a" /* default */])(this.currentUserGroupMembers),
        _step9;
      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var gu = _step9.value;
          var guEcPk = this.getPersonEcPk(gu);
          if (guEcPk) {
            this.currentUserGroup.addEmployee(gu);
            this.currentUserGroup.addReader(guEcPk);
          }
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }
    },
    pushRemovedMembersToSubGroupsForSave: function pushRemovedMembersToSubGroupsForSave() {
      var alreadyInSaveBuffer = [];
      var _iterator10 = Object(createForOfIteratorHelper["a" /* default */])(this.membersToRemove),
        _step10;
      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var mtrId = _step10.value;
          var memberToRemove = this.allPersonMap[mtrId];
          if (memberToRemove) {
            var memberPk = this.getPersonEcPk(memberToRemove);
            if (memberPk) {
              var subGroupIds = this.getSubGroupIdsForUserGroup(this.currentUserGroupId);
              var _iterator11 = Object(createForOfIteratorHelper["a" /* default */])(subGroupIds),
                _step11;
              try {
                for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
                  var sgId = _step11.value;
                  var subGroup = this.userGroupMap[sgId];
                  if (subGroup && this.isPersonalIdentityAnObjectOwner(subGroup) && subGroup.employee.includes(mtrId)) {
                    subGroup.removeEmployeeById(mtrId);
                    subGroup.removeOwner(memberPk);
                    subGroup.removeReader(memberPk);
                    if (!alreadyInSaveBuffer.includes(subGroup.shortId())) {
                      this.userGroupsToSave.push(subGroup);
                      alreadyInSaveBuffer.push(subGroup.shortId());
                    }
                  }
                }
              } catch (err) {
                _iterator11.e(err);
              } finally {
                _iterator11.f();
              }
            }
          }
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
    },
    saveCurrentUserGroup: function saveCurrentUserGroup() {
      this.validateCurrentUserGroupFields();
      if (!this.currentUserGroupInvalid) {
        this.userGroupBusy = true;
        this.updateCurrentUserGroupMemberList();
        this.currentUserGroup.name = this.currentUserGroupName;
        this.currentUserGroup.description = this.currentUserGroupDescription;
        this.userGroupIdToShowAfterReload = this.currentUserGroup.shortId();
        this.userGroupsToSave = [];
        this.numberOfUserGroupsSaved = 0;
        this.pushRemovedMembersToSubGroupsForSave();
        // this.currentUserGroupNeedsRekey = false;
        this.currentUserGroupNeedsRekey = this.membersToRemove.length > 0;
        this.userGroupsToSave.push(this.currentUserGroup);
        this.numberOfUserGroupsToSave = this.userGroupsToSave.length;
        this.saveUserGroup(0);
      }
    },
    cancelCurrentUserGroupChanges: function cancelCurrentUserGroupChanges() {
      this.currentUserGroupChanged = false;
      if (this.currentUserGroupIsNewGroup) {
        if (this.currentUserGroup.memberOf && this.currentUserGroup.memberOf !== '') {
          this.showGroupDetailsById(this.currentUserGroup.memberOf);
        } else {
          this.showMemberListView();
        }
      } else this.showGroupDetailsById(this.currentUserGroupId);
    },
    createNewUserGroup: function createNewUserGroup(parentGroupId) {
      var _this3 = this;
      this.userGroupBusy = true;
      this.currentUserGroupIsNewGroup = true;
      var newUserGroup = new EcOrganization();
      newUserGroup.generateId(window.repo.selectedServer);
      newUserGroup.setName('New User Group');
      newUserGroup.setDescription('New group of users');
      newUserGroup.employee = [];
      newUserGroup.addEmployee(this.$store.state.user.loggedOnPerson);
      newUserGroup.addOwner(this.getPersonalIdentityPk());
      var parentGroupLineage = null;
      if (parentGroupId) {
        newUserGroup.memberOf = parentGroupId;
        var parentGroup = this.userGroupMap[parentGroupId];
        parentGroupLineage = this.buildUserGroupLineage(parentGroup, null);
      }
      // Vue wasn't updating the this.userGroupBusy before it got busy generating the key.  Putting this timeout here
      // to let it 'catch up'.  Seems to be 'work' ok.
      setTimeout(function () {
        newUserGroup.addOrgKey(EcPpk.generateKey());
        _this3.showGroupDetails(newUserGroup, parentGroupLineage);
        _this3.userGroupBusy = false;
      }, 300);
    },
    appendGroupSubGroupIdsToArray: function appendGroupSubGroupIdsToArray(groupId, subGroupArray) {
      var ugdo = this.userGroupDisplayMap[groupId];
      if (ugdo && ugdo.subGroups && ugdo.subGroups.length > 0) {
        var _iterator12 = Object(createForOfIteratorHelper["a" /* default */])(ugdo.subGroups),
          _step12;
        try {
          for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
            var sg = _step12.value;
            subGroupArray.push(sg.id);
            this.appendGroupSubGroupIdsToArray(sg.id, subGroupArray);
          }
        } catch (err) {
          _iterator12.e(err);
        } finally {
          _iterator12.f();
        }
      }
    },
    getSubGroupIdsForUserGroup: function getSubGroupIdsForUserGroup(groupId) {
      var sga = [];
      this.appendGroupSubGroupIdsToArray(groupId, sga);
      return sga;
    },
    createSubGroupForCurrentUserGroup: function createSubGroupForCurrentUserGroup() {
      this.createNewUserGroup(this.currentUserGroupId);
    },
    setCurrentUserGroupManagerAndUserListsForDetailView: function setCurrentUserGroupManagerAndUserListsForDetailView() {
      this.currentUserGroupManagers = [];
      this.currentUserGroupMembers = [];
      if (!this.currentUserGroup.employee) return;
      var _iterator13 = Object(createForOfIteratorHelper["a" /* default */])(this.currentUserGroup.employee),
        _step13;
      try {
        for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
          var empId = _step13.value;
          var p = this.allPersonMap[empId];
          if (p) {
            if (this.isPersonIdAnObjectOwner(empId, this.currentUserGroup)) this.currentUserGroupManagers.push(p);
            if (this.isPersonIdAnObjectReader(empId, this.currentUserGroup)) this.currentUserGroupMembers.push(p);
          }
        }
      } catch (err) {
        _iterator13.e(err);
      } finally {
        _iterator13.f();
      }
    },
    generateLineageObject: function generateLineageObject(userGroup) {
      var lo = {};
      lo.name = userGroup.getName();
      lo.id = userGroup.shortId();
      return lo;
    },
    fillOutLineage: function fillOutLineage(ugLineage, userGroup) {
      if (userGroup) {
        ugLineage.unshift(this.generateLineageObject(userGroup));
        if (userGroup.memberOf && userGroup.memberOf !== '') {
          this.fillOutLineage(ugLineage, this.userGroupMap[userGroup.memberOf]);
        }
      }
    },
    buildUserGroupLineage: function buildUserGroupLineage(userGroup, inheritedLineage) {
      var ugLineage = [];
      if (!inheritedLineage) {
        this.fillOutLineage(ugLineage, userGroup);
      } else {
        ugLineage = inheritedLineage;
        ugLineage.push(this.generateLineageObject(userGroup));
      }
      return ugLineage;
    },
    showGroupDetails: function showGroupDetails(userGroup, inheritedLineage) {
      if (userGroup) {
        this.membersToRemove = [];
        this.userGroupsToSave = [];
        this.userGroupsToDelete = [];
        this.setCurrentUserGroupValidationsChecksToValid();
        this.currentUserGroupChanged = this.currentUserGroupIsNewGroup;
        this.currentUserGroup = userGroup;
        this.currentUserGroupId = userGroup.shortId();
        this.currentUserGroupNeedsRekey = false;
        this.isEditingCurrentGroupName = false;
        this.isEditingCurrentGroupDescription = false;
        this.currentUserGroupName = this.currentUserGroup.getName();
        this.currentUserGroupDescription = this.currentUserGroup.getDescription();
        this.currentUserGroupIsManager = this.doesAnyIdentityOwnObject(this.currentUserGroup);
        this.setCurrentUserGroupManagerAndUserListsForDetailView();
        this.currentUserGroupLineage = this.buildUserGroupLineage(this.currentUserGroup, inheritedLineage);
        this.showGroupDetailView();
      }
    },
    showGroupDetailsById: function showGroupDetailsById(id) {
      if (this.currentUserGroupChanged) {
        this.toId = id;
        this.showConfirmLoseChanges(id);
      } else {
        this.switchUserGroupDetailsById(id);
        this.groupsDropdownActive = false;
      }
    },
    switchUserGroupDetailsById: function switchUserGroupDetailsById(id) {
      var userGroup = this.userGroupMap[id];
      if (userGroup) {
        this.currentUserGroupIsNewGroup = false;
        this.showGroupDetails(userGroup, null);
        this.groupsDropdownActive = false;
      } else {
        appLog('Cannot find user group: ' + id);
      }
    },
    showConfirmLoseChanges: function showConfirmLoseChanges(val) {
      this.toId = val;
      this.showConfirmLoseChangesModal = true;
    },
    truncateString: function truncateString(str, num) {
      if (str.length <= num) {
        return str;
      }
      return str.slice(0, num) + '...';
    },
    confirmLoseChanges: function confirmLoseChanges() {
      this.switchUserGroupDetailsById(this.toId);
      this.toId = '';
      this.showConfirmLoseChangesModal = false;
    },
    confirmLoseChangesAndNav: function confirmLoseChangesAndNav() {
      this.showConfirmLoseChangesModal = false;
      this.currentUserGroupChanged = false;
      this.$router.push(this.toRoute.name);
    },
    cancelLoseChanges: function cancelLoseChanges() {
      this.toId = '';
      this.showConfirmLoseChangesModal = false;
    },
    sortUserGroupList: function sortUserGroupList(userGroupList) {
      var me = this;
      userGroupList.sort(function (ug1, ug2) {
        var ug1Owned = me.doesAnyIdentityOwnObject(ug1);
        var ug2Owned = me.doesAnyIdentityOwnObject(ug2);
        if (ug1Owned !== ug2Owned) {
          if (ug2Owned) return 1;else return -1;
        } else {
          if (ug1.getName() > ug2.getName()) return 1;else if (ug2.getName() > ug1.getName()) return -1;else return 0;
        }
      });
    },
    buildUserGroupMap: function buildUserGroupMap(userGroupList) {
      this.userGroupMap = {};
      var _iterator14 = Object(createForOfIteratorHelper["a" /* default */])(userGroupList),
        _step14;
      try {
        for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
          var ug = _step14.value;
          this.userGroupMap[ug.shortId()] = ug;
        }
      } catch (err) {
        _iterator14.e(err);
      } finally {
        _iterator14.f();
      }
    },
    buildUserGroupDisplayObjects: function buildUserGroupDisplayObjects(userGroupList) {
      var ugDisplayObjs = {};
      ugDisplayObjs.doMap = {}; // map by ID
      ugDisplayObjs.doList = []; // list to preserve sort order
      var _iterator15 = Object(createForOfIteratorHelper["a" /* default */])(userGroupList),
        _step15;
      try {
        for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
          var ug = _step15.value;
          var ugdo = {};
          ugdo.id = ug.shortId();
          ugdo.name = ug.getName();
          // if (ug.memberOf && ug.memberOf !== '') ugdo.memberOf = ug.memberOf;
          // changing this a little bit so that dangling groups can be seen...if needed
          if (ug.memberOf && ug.memberOf !== '' && this.userGroupMap[ug.memberOf]) ugdo.memberOf = ug.memberOf;
          ugdo.subGroups = [];
          ugDisplayObjs.doMap[ugdo.id] = ugdo;
          ugDisplayObjs.doList.push(ugdo);
        }
      } catch (err) {
        _iterator15.e(err);
      } finally {
        _iterator15.f();
      }
      return ugDisplayObjs;
    },
    assignUserGroupDisplayObjectsSubGroups: function assignUserGroupDisplayObjectsSubGroups(ugDisplayObjs) {
      var _iterator16 = Object(createForOfIteratorHelper["a" /* default */])(ugDisplayObjs.doList),
        _step16;
      try {
        for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
          var ugdo = _step16.value;
          if (ugdo.memberOf) {
            ugDisplayObjs.doMap[ugdo.memberOf].subGroups.push(ugdo);
          }
        }
      } catch (err) {
        _iterator16.e(err);
      } finally {
        _iterator16.f();
      }
    },
    addRootUserGroupsToUserGroupDisplayList: function addRootUserGroupsToUserGroupDisplayList(ugDisplayObjs) {
      var _iterator17 = Object(createForOfIteratorHelper["a" /* default */])(ugDisplayObjs.doList),
        _step17;
      try {
        for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
          var ugdo = _step17.value;
          if (!ugdo.memberOf) {
            this.userGroupDisplayList.push(ugdo);
          }
        }
      } catch (err) {
        _iterator17.e(err);
      } finally {
        _iterator17.f();
      }
    },
    buildUserGroupDisplayList: function buildUserGroupDisplayList(userGroupList) {
      this.userGroupDisplayList = [];
      this.userGroupDisplayMap = {};
      var ugDisplayObjs = this.buildUserGroupDisplayObjects(userGroupList);
      this.assignUserGroupDisplayObjectsSubGroups(ugDisplayObjs);
      this.addRootUserGroupsToUserGroupDisplayList(ugDisplayObjs);
      this.userGroupDisplayMap = ugDisplayObjs.doMap;
    },
    buildInitialGroupMembersDisplayData: function buildInitialGroupMembersDisplayData() {
      var initGrpMemDispData = {};
      initGrpMemDispData.gmList = [];
      initGrpMemDispData.gmMap = {};
      var _iterator18 = Object(createForOfIteratorHelper["a" /* default */])(this.allPersonList),
        _step18;
      try {
        for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
          var p = _step18.value;
          var pdo = {};
          pdo.name = p.getName();
          pdo.email = p.email;
          pdo.managerOf = [];
          pdo.memberOf = [];
          initGrpMemDispData.gmList.push(pdo);
          initGrpMemDispData.gmMap[p.getFingerprint()] = pdo;
        }
      } catch (err) {
        _iterator18.e(err);
      } finally {
        _iterator18.f();
      }
      return initGrpMemDispData;
    },
    addMembershipData: function addMembershipData(gmMap, pdoKey, pkData, ug) {
      if (pkData) {
        var _iterator19 = Object(createForOfIteratorHelper["a" /* default */])(pkData),
          _step19;
        try {
          for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
            var pk = _step19.value;
            var pkFingerprint = EcPk.fromPem(pk).fingerprint();
            if (gmMap[pkFingerprint]) {
              var mo = {};
              mo.name = ug.getName();
              mo.id = ug.shortId();
              gmMap[pkFingerprint][pdoKey].push(mo);
            }
          }
        } catch (err) {
          _iterator19.e(err);
        } finally {
          _iterator19.f();
        }
      }
    },
    fillOutMembershipData: function fillOutMembershipData(initGrpMemDispData) {
      for (var _i = 0, _Object$keys = Object.keys(this.userGroupMap); _i < _Object$keys.length; _i++) {
        var ugKey = _Object$keys[_i];
        var ug = this.userGroupMap[ugKey];
        this.addMembershipData(initGrpMemDispData.gmMap, 'managerOf', ug.owner, ug);
        this.addMembershipData(initGrpMemDispData.gmMap, 'memberOf', ug.reader, ug);
      }
    },
    filterOutNonMembers: function filterOutNonMembers(initGrpMemDispData) {
      var _iterator20 = Object(createForOfIteratorHelper["a" /* default */])(initGrpMemDispData.gmList),
        _step20;
      try {
        for (_iterator20.s(); !(_step20 = _iterator20.n()).done;) {
          var gm = _step20.value;
          if (gm.managerOf.length > 0 || gm.memberOf.length > 0) {
            this.allGroupMembersList.push(gm);
          }
        }
      } catch (err) {
        _iterator20.e(err);
      } finally {
        _iterator20.f();
      }
    },
    sortMembershipData: function sortMembershipData(membershipData) {
      membershipData.sort(function (mo1, mo2) {
        return mo1.name > mo2.name ? 1 : -1;
      });
    },
    sortGroupMemberListMembershipData: function sortGroupMemberListMembershipData() {
      var _iterator21 = Object(createForOfIteratorHelper["a" /* default */])(this.allGroupMembersList),
        _step21;
      try {
        for (_iterator21.s(); !(_step21 = _iterator21.n()).done;) {
          var gm = _step21.value;
          this.sortMembershipData(gm.managerOf);
          this.sortMembershipData(gm.memberOf);
        }
      } catch (err) {
        _iterator21.e(err);
      } finally {
        _iterator21.f();
      }
    },
    buildGroupMembersDisplayList: function buildGroupMembersDisplayList() {
      this.allGroupMembersList = [];
      var initGrpMemDispData = this.buildInitialGroupMembersDisplayData();
      this.fillOutMembershipData(initGrpMemDispData);
      this.filterOutNonMembers(initGrpMemDispData);
      this.sortGroupMemberListMembershipData();
    },
    searchRepositoryForGroupsSuccess: function searchRepositoryForGroupsSuccess(ecoa) {
      var userGroupList = [];
      if (ecoa && ecoa.length > 0) {
        userGroupList = ecoa;
        this.sortUserGroupList(userGroupList);
      }
      this.buildUserGroupMap(userGroupList);
      this.buildUserGroupDisplayList(userGroupList);
      this.buildGroupMembersDisplayList();
      if (this.userGroupIdToShowAfterReload && this.userGroupIdToShowAfterReload.trim().length > 0 && this.userGroupMap[this.userGroupIdToShowAfterReload]) {
        var goToId = this.userGroupIdToShowAfterReload;
        this.userGroupIdToShowAfterReload = '';
        this.showGroupDetailsById(goToId);
      } else this.showMemberListView();
      this.userGroupBusy = false;
    },
    searchRepositoryForGroupsFailure: function searchRepositoryForGroupsFailure(msg) {
      appLog("Group search failure: " + msg);
      this.userGroupBusy = false;
    },
    buildGroupListData: function buildGroupListData() {
      var paramObj = {};
      paramObj.size = this.GROUP_SEARCH_SIZE;
      EcOrganization.search(window.repo, '', this.searchRepositoryForGroupsSuccess, this.searchRepositoryForGroupsFailure, paramObj);
    },
    sortAllPersonList: function sortAllPersonList() {
      this.allPersonList.sort(function (p1, p2) {
        if (p1.getName() > p2.getName()) return 1;else if (p2.getName() > p1.getName()) return -1;else return 0;
      });
    },
    buildAllPersonMap: function buildAllPersonMap() {
      this.allPersonMap = {};
      var _iterator22 = Object(createForOfIteratorHelper["a" /* default */])(this.allPersonList),
        _step22;
      try {
        for (_iterator22.s(); !(_step22 = _iterator22.n()).done;) {
          var p = _step22.value;
          this.allPersonMap[p.shortId()] = p;
        }
      } catch (err) {
        _iterator22.e(err);
      } finally {
        _iterator22.f();
      }
    },
    fetchPersonListForDetailViewSuccess: function fetchPersonListForDetailViewSuccess(ecpa) {
      this.allPersonList = ecpa;
      this.sortAllPersonList();
      this.buildAllPersonMap();
      this.buildGroupListData();
    },
    fetchPersonListForDetailViewFailure: function fetchPersonListForDetailViewFailure(msg) {
      appLog("Person search failure: " + msg);
      this.userGroupBusy = false;
    },
    buildUserGroupData: function buildUserGroupData() {
      this.userGroupBusy = true;
      var paramObj = {};
      paramObj.size = this.PERSON_SEARCH_SIZE;
      EcPerson.search(window.repo, '', this.fetchPersonListForDetailViewSuccess, this.fetchPersonListForDetailViewFailure, paramObj);
    }
  },
  mounted: function mounted() {
    this.buildUserGroupData();
  }
});
// CONCATENATED MODULE: ./src/views/usersGroups/UserGroupEditor.vue?vue&type=script&lang=js
 /* harmony default export */ var usersGroups_UserGroupEditorvue_type_script_lang_js = (UserGroupEditorvue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/views/usersGroups/UserGroupEditor.vue?vue&type=style&index=0&id=536bacce&prod&lang=scss
var UserGroupEditorvue_type_style_index_0_id_536bacce_prod_lang_scss = __webpack_require__("e749");

// CONCATENATED MODULE: ./src/views/usersGroups/UserGroupEditor.vue






/* normalize component */

var UserGroupEditor_component = Object(componentNormalizer["a" /* default */])(
  usersGroups_UserGroupEditorvue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var UserGroupEditor = __webpack_exports__["default"] = (UserGroupEditor_component.exports);

/***/ }),

/***/ "4a82":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "62af":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6d79":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cassUtil; });
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ac1f");
/* harmony import */ var core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_exec_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("841c");
/* harmony import */ var core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_search_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("25f0");
/* harmony import */ var core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_regexp_to_string_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("caad");
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("2532");
/* harmony import */ var core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_string_includes_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("14d9");
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("c7eb");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("b85c");
/* harmony import */ var _home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("1da1");

















var cassUtil = {
  name: 'cassUtil',
  data: function data() {
    return {};
  },
  methods: {
    getOrganizationByEcPk: function getOrganizationByEcPk(ecPk, successCallback, failureCallback) {
      var ecPkPem = ecPk.toPem();
      var paramObj = {};
      paramObj.size = 10000;
      EcOrganization.search(window.repo, '', /*#__PURE__*/function () {
        var _ref = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])().mark(function _callee(ecoa) {
          var _iterator, _step, o, groupPpkSet, _iterator2, _step2, gPpk;
          return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _iterator = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(ecoa);
                _context.prev = 1;
                _iterator.s();
              case 3:
                if ((_step = _iterator.n()).done) {
                  _context.next = 34;
                  break;
                }
                o = _step.value;
                _context.prev = 5;
                _context.next = 8;
                return o.getOrgKeys();
              case 8:
                groupPpkSet = _context.sent;
                _iterator2 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(groupPpkSet);
                _context.prev = 10;
                _iterator2.s();
              case 12:
                if ((_step2 = _iterator2.n()).done) {
                  _context.next = 19;
                  break;
                }
                gPpk = _step2.value;
                if (!(gPpk && gPpk.toPk().toPem().equals(ecPkPem))) {
                  _context.next = 17;
                  break;
                }
                successCallback(o);
                return _context.abrupt("return");
              case 17:
                _context.next = 12;
                break;
              case 19:
                _context.next = 24;
                break;
              case 21:
                _context.prev = 21;
                _context.t0 = _context["catch"](10);
                _iterator2.e(_context.t0);
              case 24:
                _context.prev = 24;
                _iterator2.f();
                return _context.finish(24);
              case 27:
                _context.next = 32;
                break;
              case 29:
                _context.prev = 29;
                _context.t1 = _context["catch"](5);
                // TODO Problem with EcOrganization update and creating encrypted value when only a reader...
                // Anticipated workaround....login as group owner and save it.
                // console.error("TODO...fix this...needs FRITZ input!!!!: " + e.toString());
                failureCallback(_context.t1.toString());
              case 32:
                _context.next = 3;
                break;
              case 34:
                _context.next = 39;
                break;
              case 36:
                _context.prev = 36;
                _context.t2 = _context["catch"](1);
                _iterator.e(_context.t2);
              case 39:
                _context.prev = 39;
                _iterator.f();
                return _context.finish(39);
              case 42:
                successCallback(null);
              case 43:
              case "end":
                return _context.stop();
            }
          }, _callee, null, [[1, 36, 39, 42], [5, 29], [10, 21, 24, 27]]);
        }));
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }(), function (err) {
        failureCallback(err);
      }, paramObj);
    },
    getOrganizationEcPk: function getOrganizationEcPk(orgObj) {
      return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"])( /*#__PURE__*/Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])().mark(function _callee2() {
        return Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_regeneratorRuntime_js__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return orgObj.getCurrentOrgKey();
            case 3:
              return _context2.abrupt("return", _context2.sent.toPk());
            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", null);
            case 9:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 6]]);
      }))();
    },
    getPersonEcPk: function getPersonEcPk(personObj) {
      var personFingerprint = this.generateProbablePersonFingerprintFromShortId(personObj.shortId());
      if (personObj.owner) {
        var _iterator3 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(personObj.owner),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var pkPem = _step3.value;
            var ecPk = EcPk.fromPem(pkPem);
            if (personFingerprint.equals(ecPk.fingerprint())) return ecPk;
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
      return null;
    },
    addAllOwnersFromObjectToObject: function addAllOwnersFromObjectToObject(fromObj, toObj) {
      if (fromObj && fromObj.owner) {
        var _iterator4 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(fromObj.owner),
          _step4;
        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var pkPem = _step4.value;
            var ecPk = EcPk.fromPem(pkPem);
            toObj.addOwner(ecPk);
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }
    },
    setDefaultBrowserConfigId: function setDefaultBrowserConfigId(configId) {
      localStorage.setItem("cassAuthoringToolDefaultBrowserConfigId", configId);
    },
    removeDefaultBrowserConfig: function removeDefaultBrowserConfig() {
      localStorage.removeItem("cassAuthoringToolDefaultBrowserConfigId");
    },
    getDefaultBrowserConfigId: function getDefaultBrowserConfigId() {
      return localStorage.getItem("cassAuthoringToolDefaultBrowserConfigId");
    },
    getBooleanValue: function getBooleanValue(val) {
      if (typeof val === 'boolean') return val;else if (typeof val === 'string') {
        if (val.equalsIgnoreCase('true')) return true;else return false;
      } else return false;
    },
    addAllIdentityPksAsOwners: function addAllIdentityPksAsOwners(obj) {
      // let isEcrld = (obj instanceOf EcRemoteLinkedData);
      if (EcIdentityManager && EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
        for (var i = 0; i < EcIdentityManager.default.ids.length; i++) {
          obj.addOwner(EcIdentityManager.default.ids[i].ppk.toPk());
        }
      }
    },
    isObjectOwnerless: function isObjectOwnerless(obj) {
      if (!obj.owner || obj.owner.length === 0) return true;else return false;
    },
    doesAnyIdentityOwnObject: function doesAnyIdentityOwnObject(obj) {
      if (this.isAdmin()) return true;
      if (obj.canEditAny == null) return true;
      return obj.canEditAny(EcIdentityManager.default.getMyPks());
    },
    canEditAny: function canEditAny(item) {
      if (this.isAdmin()) return true;
      if (item.canEditAny == null) return true;
      return item.canEditAny(EcIdentityManager.default.getMyPks());
    },
    isAdmin: function isAdmin() {
      if (EcIdentityManager.default.ids.length > 0 && window.repo.adminKeys != null && window.repo.adminKeys.length > 0) {
        if (window.repo.adminKeys[0] === EcIdentityManager.default.ids[0].ppk.toPk().toPem()) {
          return true;
        }
      }
      return false;
    },
    generateProbablePersonFingerprintFromShortId: function generateProbablePersonFingerprintFromShortId(personShortId) {
      return personShortId.substring(personShortId.lastIndexOf("/") + 1);
    },
    isPersonIdAnObjectOwner: function isPersonIdAnObjectOwner(personShortId, obj) {
      if (!obj.owner || obj.owner.length === 0) return false;
      var personFingerprint = this.generateProbablePersonFingerprintFromShortId(personShortId);
      var _iterator5 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(obj.owner),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var ownerPkPem = _step5.value;
          var ownerFingerprint = EcPk.fromPem(ownerPkPem).fingerprint();
          if (ownerFingerprint.equals(personFingerprint)) return true;
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      return false;
    },
    isPersonIdAnObjectReader: function isPersonIdAnObjectReader(personShortId, obj) {
      if (!obj.reader || obj.reader.length === 0) return false;
      var personFingerprint = this.generateProbablePersonFingerprintFromShortId(personShortId);
      var _iterator6 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(obj.reader),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var readerPkPem = _step6.value;
          var readerFingerprint = EcPk.fromPem(readerPkPem).fingerprint();
          if (readerFingerprint.equals(personFingerprint)) return true;
        }
        // return obj.hasReader(EcPk.fromPem(pkPem));
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      return false;
    },
    areAnyIdentitiesThisPerson: function areAnyIdentitiesThisPerson(personObj) {
      var personFingerprint = personObj.getFingerprint();
      if (EcIdentityManager && EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
        for (var i = 0; i < EcIdentityManager.default.ids.length; i++) {
          if (EcIdentityManager.default.ids[i].ppk.toPk().fingerprint().equals(personFingerprint)) return true;
        }
      }
      return false;
    },
    isPersonalIdentityAnObjectOwner: function isPersonalIdentityAnObjectOwner(obj) {
      if (this.isAdmin()) return true;
      if (!obj.owner || obj.owner.length === 0) return false;
      var personalIdentPkPem = this.getPersonalIdentityPk().toPem();
      return obj.owner.includes(personalIdentPkPem);
    },
    getPersonalIdentityPk: function getPersonalIdentityPk() {
      // assuming that the first identity is the user's personal identity
      if (EcIdentityManager && EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) {
        return EcIdentityManager.default.ids[0].ppk.toPk();
      } else return null;
    },
    buildEcAlignmentsFromRemoteLinkedData: function buildEcAlignmentsFromRemoteLinkedData(ecrlda) {
      var ecaa = [];
      var _iterator7 = Object(_home_runner_work_cass_editor_cass_editor_node_modules_babel_runtime_helpers_esm_createForOfIteratorHelper_js__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(ecrlda),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var ecrld = _step7.value;
          var eca = new EcAlignment();
          eca.copyFrom(ecrld);
          ecaa.push(eca);
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
      return ecaa;
    }
  },
  computed: {
    amLoggedIn: function amLoggedIn() {
      if (EcIdentityManager && EcIdentityManager.default.ids && EcIdentityManager.default.ids.length > 0) return true;else return false;
    }
  }
};

/***/ }),

/***/ "8c8e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dropdown_vue_vue_type_style_index_0_id_740590b3_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8dc7");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dropdown_vue_vue_type_style_index_0_id_740590b3_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Dropdown_vue_vue_type_style_index_0_id_740590b3_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "8d7e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalTemplate_vue_vue_type_style_index_0_id_1c4e04a7_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("62af");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalTemplate_vue_vue_type_style_index_0_id_1c4e04a7_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ModalTemplate_vue_vue_type_style_index_0_id_1c4e04a7_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "8dc7":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "984b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "9fd8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DropdownItem_vue_vue_type_style_index_0_id_37afeae8_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4a82");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DropdownItem_vue_vue_type_style_index_0_id_37afeae8_prod_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DropdownItem_vue_vue_type_style_index_0_id_37afeae8_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "af07":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"fffa3e18-vue-loader-template"}!./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/loaders/templateLoader.js??ref--7!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/ModalTemplate.vue?vue&type=template&id=1c4e04a7
var render = function render() {
  var _vm = this,
    _c = _vm._self._c;
  return _c('div', {
    staticClass: "modal cass-editor___modal",
    class: [{
      'is-active': _vm.active
    }, 'is-' + _vm.size, 'cass-editor__modal--' + _vm.content],
    attrs: {
      "id": "cass-modal"
    }
  }, [_c('div', {
    staticClass: "modal-background"
  }), _c('div', {
    staticClass: "modal-card",
    class: 'cass-editor__modal-card--' + _vm.size
  }, [_c('header', {
    staticClass: "modal-card-head is-size-4 has-text-weight-bold",
    class: ['has-background-' + _vm.type, 'has-text-' + _vm.fontColor]
  }, [_c('p', {
    staticClass: "modal-card-title"
  }, [_vm._t("modal-header")], 2), _vm.canClose ? _c('button', {
    staticClass: "delete",
    attrs: {
      "aria-label": "close"
    },
    on: {
      "click": function click($event) {
        _vm.$store.commit('app/closeModal');
        _vm.$emit('close');
      }
    }
  }) : _vm._e()]), _c('div', {
    staticClass: "modal-card-body has-text-dark"
  }, [_vm._t("modal-body")], 2), _c('footer', {
    staticClass: "modal-card-foot has-background-white"
  }, [_vm._t("modal-foot")], 2)])]);
};
var staticRenderFns = [];

// CONCATENATED MODULE: ./src/components/modalContent/ModalTemplate.vue?vue&type=template&id=1c4e04a7

// EXTERNAL MODULE: ./src/scss/modal-template.scss
var modal_template = __webpack_require__("984b");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--13-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--1-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/modalContent/ModalTemplate.vue?vue&type=script&lang=js

/* harmony default export */ var ModalTemplatevue_type_script_lang_js = ({
  name: 'ModalTemplate',
  props: {
    canClose: {
      type: Boolean,
      default: true
    },
    active: {
      type: Boolean,
      default: false
    },
    type: {
      default: 'primary',
      type: String
    },
    fontColor: {
      type: String,
      default: 'white'
    },
    size: {
      type: String,
      default: 'medium'
    },
    content: {
      defualt: 'default',
      type: String
    }
  },
  data: function data() {
    return {};
  },
  computed: {}
});
// CONCATENATED MODULE: ./src/components/modalContent/ModalTemplate.vue?vue&type=script&lang=js
 /* harmony default export */ var modalContent_ModalTemplatevue_type_script_lang_js = (ModalTemplatevue_type_script_lang_js); 
// EXTERNAL MODULE: ./src/components/modalContent/ModalTemplate.vue?vue&type=style&index=0&id=1c4e04a7&prod&lang=scss
var ModalTemplatevue_type_style_index_0_id_1c4e04a7_prod_lang_scss = __webpack_require__("8d7e");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/modalContent/ModalTemplate.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  modalContent_ModalTemplatevue_type_script_lang_js,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ModalTemplate = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "b141":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PanelItem_vue_vue_type_style_index_0_id_21c532fe_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ec52");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PanelItem_vue_vue_type_style_index_0_id_21c532fe_prod_lang_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PanelItem_vue_vue_type_style_index_0_id_21c532fe_prod_lang_css__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "e749":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserGroupEditor_vue_vue_type_style_index_0_id_536bacce_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("39f8");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserGroupEditor_vue_vue_type_style_index_0_id_536bacce_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UserGroupEditor_vue_vue_type_style_index_0_id_536bacce_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ }),

/***/ "ec52":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ed63":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Panel_vue_vue_type_style_index_0_id_ac90d998_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("00f9");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Panel_vue_vue_type_style_index_0_id_ac90d998_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_9_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_9_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_9_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_1_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Panel_vue_vue_type_style_index_0_id_ac90d998_prod_lang_scss__WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */


/***/ })

}]);
//# sourceMappingURL=userGroupEditor.f702df0b.js.map