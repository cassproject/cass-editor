(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{476:function(e,t,a){"use strict";a.r(t);var n=a(55),r=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"overview"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#overview"}},[e._v("#")]),e._v(" Overview")]),e._v(" "),a("p",[e._v("Last updated 2018-12-12")]),e._v(" "),a("h2",{attrs:{id:"welcome"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#welcome"}},[e._v("#")]),e._v(" Welcome")]),e._v(" "),a("p",[e._v("We sincerely hope your development experience with CASS will be easy and enlightening. Perhaps some of the lessons learned and tools created during its development will benefit you on other projects. -- CASS Team")]),e._v(" "),a("h2",{attrs:{id:"about-cass"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#about-cass"}},[e._v("#")]),e._v(" About CaSS")]),e._v(" "),a("p",[e._v("CaSS is open-source software that enables users and other systems to define, store, manage, and access data objects called competencies that are organized into structured collections called frameworks, and to report, store, and retrieve assertions about the competencies held by an individual.")]),e._v(" "),a("p",[e._v("CaSS consists of open source code that provides two basic sets of services intended for use by applications that support competency-based approaches to education, training, and workforce development. The goal of CaSS is to enable these applications to share competencies and related information about learners and learning resources in an interoperable and secure manner. The basic services provided by CaSS are used by applications to:")]),e._v(" "),a("ul",[a("li",[e._v("Define, store, manage, and access objects called competencies that are organized into structured collections called frameworks. Competencies can represent competencies, skills, knowledge, abilities, traits, learning objectives, learning outcomes, and other similar constructs that define performance, mastery, attainment, or capabilities. Frameworks are structured collections of competencies associated with a knowledge domain, a domain of endeavor, a job, or a task with structure defined by relations among the competencies they (or other frameworks) contain. CaSS provides persistent, unique URLs that multiple applications can use to access and reference the same frameworks and competencies.")]),e._v(" "),a("li",[e._v("Store assertions about the competencies held by an individual (or team), and compile assertions and other data into profiles that describe a learner’s current state. CaSS is designed to respond to queries from other applications that, for instance, ask whether an individual X holds a competency Y (at performance level Z). Subject to authorization and adherence to privacy protection policies, CaSS will answer yes or no and might include a number indicating its confidence in the answer, a link to evidence, and an expiry date. In addition, CaSS can collect assertions and other data from multiple sources and apply relations and rules to formulate a response to a query.")])]),e._v(" "),a("h3",{attrs:{id:"intended-scope"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#intended-scope"}},[e._v("#")]),e._v(" Intended Scope")]),e._v(" "),a("p",[e._v("CaSS is intended to allow competencies and competency frameworks to be defined, published, accessed, and applied in any size jurisdiction, ranging from a single learning system to an organization, a community of practice, or the entire world. The CaSS project believes that this capability is achievable and is needed to support competency-based approaches to training, education, credentialing, and career management. In fact, there already exist services such as the "),a("a",{attrs:{href:"http://www.achievementstandards.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Achievement Standards Network"),a("OutboundLink")],1),e._v(" and "),a("a",{attrs:{href:"https://www.onetonline.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("O*Net"),a("OutboundLink")],1),e._v(" that do this. Sharing assertions of competency among collaborating systems is another goal. Currently, this is done by using credentials as intermediaries, and the CaSS project believes that significant value can be achieved by enabling such sharing with closed ecosystems that consist of collaborating systems deployed by a training organization, educational institution, corporation, government agency, or a similar organization. Although the CaSS project has looked at broader use cases, the current version of CaSS therefore assumes that it is operating within such an ecosystem.")]),e._v(" "),a("h3",{attrs:{id:"services-not-end-user-applications"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#services-not-end-user-applications"}},[e._v("#")]),e._v(" Services, not End-user Applications")]),e._v(" "),a("p",[e._v("Although the CaSS project is providing reference implementations of end-user applications that use the CaSS services, the CaSS services themselves are not end-user applications. They enable learning management systems, HR systems, talent management systems, student information systems, MOOCS, intelligent tutoring systems, learning resource repositories and registries, competency management systems, and other learning- and training-related applications to exchange data through software, but end-users do not interact directly with the services.")]),e._v(" "),a("h3",{attrs:{id:"infrastructure-and-interoperability-but-not-another-standard"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#infrastructure-and-interoperability-but-not-another-standard"}},[e._v("#")]),e._v(" Infrastructure and Interoperability, but not Another Standard")]),e._v(" "),a("p",[e._v("CaSS is infrastructure that is intended to promote interoperability among software systems that produce and consume competencies and competency assertions.  As expected, CaSS documentation specifies how these systems must receive and transmit data, and to the extent that systems must conform to these specifications to use CaSS. CaSS documentation also specifies the object models (expressed as Linked Data schema) that CaSS uses to internally store competencies, frameworks, and assertions, and to represent alignments between resources and competencies; None of these internal representations are intended to be standards. To the contrary, multiple standards exist and are in development for these purposes.  The CaSS project supports these standards as import and export formats and does not to try to create yet another one.")]),e._v(" "),a("p",[a("img",{attrs:{src:"/cass-overview-comic.png",alt:"XKCD Comic"}})]),e._v(" "),a("h3",{attrs:{id:"collaboration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#collaboration"}},[e._v("#")]),e._v(" Collaboration")]),e._v(" "),a("p",[e._v("The CaSS Project is a community effort that strives to incorporate, support, and add value to the work of the many individuals and organizations involved in competency-based education and training. These include the "),a("a",{attrs:{href:"https://www.credentialtransparencyinitiative.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Credential Engine"),a("OutboundLink")],1),e._v(", the "),a("a",{attrs:{href:"https://www.imsglobal.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("IMS Global Learning Consortium"),a("OutboundLink")],1),e._v(", the "),a("a",{attrs:{href:"https://ieee-sa.imeetcentral.com/ltsc/",target:"_blank",rel:"noopener noreferrer"}},[e._v("IEEE Learning Technology Standards Committee"),a("OutboundLink")],1),e._v(", "),a("a",{attrs:{href:"https://www.medbiq.org/std_specs/",target:"_blank",rel:"noopener noreferrer"}},[e._v("MedBiquitous"),a("OutboundLink")],1),e._v(", the "),a("a",{attrs:{href:"https://www.dublincore.org/specifications/lrmi/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Learning Resource Metadata Initiative"),a("OutboundLink")],1),e._v(", the "),a("a",{attrs:{href:"http://www.cetis.org.uk/inloc/Home",target:"_blank",rel:"noopener noreferrer"}},[e._v("Centre for Educational Technology Interoperability and Standards"),a("OutboundLink")],1),e._v(", the "),a("a",{attrs:{href:"http://www.achievementstandards.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Achievement Standards Network"),a("OutboundLink")],1),e._v(", "),a("a",{attrs:{href:"https://www.onetonline.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("O*Net"),a("OutboundLink")],1),e._v(", and many others.")]),e._v(" "),a("h2",{attrs:{id:"design-principles"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#design-principles"}},[e._v("#")]),e._v(" Design Principles")]),e._v(" "),a("h3",{attrs:{id:"federated-not-centralized-not-distributed"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#federated-not-centralized-not-distributed"}},[e._v("#")]),e._v(" Federated, not centralized, not distributed")]),e._v(" "),a("p",[e._v("CaSS follows a "),a("a",{attrs:{href:"https://en.wikipedia.org/wiki/Federated_architecture",target:"_blank",rel:"noopener noreferrer"}},[e._v("Federated Architecture"),a("OutboundLink")],1),e._v(". CaSS components communicate with each other via web services and common object models. A CaSS instance may be deployed by any party, may be exposed to the public, or may be set up behind a firewall on a private network. CaSS instances can be standalone or syndicated and can be distributed over multiple servers.")]),e._v(" "),a("h3",{attrs:{id:"open-source"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#open-source"}},[e._v("#")]),e._v(" Open Source")]),e._v(" "),a("p",[e._v("CaSS code is released on GitHub under a non-viral (“business-friendly”) Apache 2.0 license.")]),e._v(" "),a("h3",{attrs:{id:"open-data"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#open-data"}},[e._v("#")]),e._v(" Open Data")]),e._v(" "),a("p",[e._v("CaSS uses and promotes "),a("a",{attrs:{href:"https://en.wikipedia.org/wiki/Linked_data",target:"_blank",rel:"noopener noreferrer"}},[e._v("linked data"),a("OutboundLink")],1),e._v(" and "),a("a",{attrs:{href:"https://en.wikipedia.org/wiki/Open_data",target:"_blank",rel:"noopener noreferrer"}},[e._v("open data"),a("OutboundLink")],1),e._v(" and has mechanisms in place to facilitate public machine-readable access to competency data. CaSS selectively includes encryption mechanisms to identify users anonymously, provide data integrity and nonrepudiation, and protect Personally Identifiable Information. This use of encryption to protect rights allows researchers to use CaSS data without the need to maintain relationships of trust with providers of sensitive data.")]),e._v(" "),a("h3",{attrs:{id:"open-schema"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#open-schema"}},[e._v("#")]),e._v(" Open Schema")]),e._v(" "),a("p",[e._v("The CaSS Project publishes its schema for all to use. These schemas are versioned and the CaSS library provides upgrade paths to move information forward as community ideas evolve. The CaSS Project and its collaborators maintain these schema.")]),e._v(" "),a("h3",{attrs:{id:"open-security"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#open-security"}},[e._v("#")]),e._v(" Open Security")]),e._v(" "),a("p",[e._v("CaSS supports commonly accepted and robust encryption formats (RSA and AES) for user identification, encryption, sharing, integrity and nonrepudiation. CaSS follows a no-knowledge policy, meaning that CaSS implementers, by default, cannot observe or decode protected information put into their instances by users of that instance. This preserves the privacy of user information.")]),e._v(" "),a("p",[e._v("Since CaSS is intended to be used in a wide variety of environments and applications, CaSS instances can implement and enforce stringent security and privacy policies but can also be configured to be completely open with no consideration given to either security or privacy, and everything in between.")]),e._v(" "),a("h3",{attrs:{id:"identity-management"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#identity-management"}},[e._v("#")]),e._v(" Identity Management")]),e._v(" "),a("p",[e._v("The current version of CaSS assumes that its assertion services will be deployed within an ecosystem that includes some sort of identity and group management. CaSS includes an identity manager as a core component. Because of the security and privacy concerns surrounding a person’s identity, it is recommended that applications should create non-PII identities and should not be able to access or alter the credentials of a user. The CaSS identity manager may also be configured to defer authorization and authentication to a third party system outside the ecosystem, such as OAuth.")]),e._v(" "),a("h2",{attrs:{id:"cass-instances-and-apis"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cass-instances-and-apis"}},[e._v("#")]),e._v(" CaSS Instances and APIs")]),e._v(" "),a("p",[a("strong",[e._v("CaSS")]),e._v(" stands for Competency and Skills System (or Service) and refers to the open source software available from "),a("a",{attrs:{href:"https://github.com/cassproject/CaSS",target:"_blank",rel:"noopener noreferrer"}},[e._v("GitHub"),a("OutboundLink")],1),e._v(" (CaSS Software), its associated documentation (CaSS Documentation), and services that the software implements and that the documentation describe (CaSS Services). CaSS is maintained by an effort called the CaSS Project. The CaSS Project web site is "),a("a",{attrs:{href:"https://www.cassproject.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("www.cassproject.org"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("p",[e._v("A working installation of CaSS is called a CaSS Instance and is composed of a CaSS Repository and CaSS Applications. Since CaSS is open source and has a software development kit, it can be modified, rewritten, combined with or used by other applications. If the result provides all of the documented CaSS functionality, a working installation is still considered to be a CaSS Instance.")]),e._v(" "),a("p",[e._v("Other applications interact with CaSS through the CaSS SDK. CaSS Libraries are written in Javascript and may be included in any execution environment with Javascript interoperability, such as Node, Java, or the .NET environment.")]),e._v(" "),a("p",[a("img",{attrs:{src:"/cass_overview_environment.png",alt:"CaSS Overview"}})]),e._v(" "),a("h3",{attrs:{id:"crud-apis"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#crud-apis"}},[e._v("#")]),e._v(" CRUD APIs")]),e._v(" "),a("p",[e._v("Data in CaSS is stored as objects. Subject to authorization, CaSS Web Service APIs enable these objectives to be created, retrieved, updated, and deleted (“CRUD” operations), and these operation suffice to use CaSS services.")]),e._v(" "),a("h2",{attrs:{id:"cass-objects"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cass-objects"}},[e._v("#")]),e._v(" CaSS Objects")]),e._v(" "),a("p",[e._v("In CaSS, objects are represented using "),a("a",{attrs:{href:"https://json-ld.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("JSON-LD"),a("OutboundLink")],1),e._v(" compatible with "),a("a",{attrs:{href:"https://schema.org/",target:"_blank",rel:"noopener noreferrer"}},[e._v("schema.org"),a("OutboundLink")],1),e._v(" and are extensions of "),a("a",{attrs:{href:"https://schema.org/CreativeWork",target:"_blank",rel:"noopener noreferrer"}},[e._v("creative work schema"),a("OutboundLink")],1),e._v(". The properties of creative works, (in particular names, descriptions, and URLs) are inherited and apply to all CaSS objects.")]),e._v(" "),a("h3",{attrs:{id:"competency-framework"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#competency-framework"}},[e._v("#")]),e._v(" Competency Framework")]),e._v(" "),a("p",[e._v("Frameworks contain competencies and relations among competencies. Properties include a name, description, a source (e.g. from where the framework was imported or originally defined).")]),e._v(" "),a("h3",{attrs:{id:"competency"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#competency"}},[e._v("#")]),e._v(" Competency")]),e._v(" "),a("p",[e._v("Competencies can have a scope (conditions to which the competency applies), roll-up rules, and performance levels. The latter two are expressed as independent objects, as are relations among competencies and alignments between resources and competencies. This allows users who do not have access to and do not own competencies to define roll-up rules, levels, relations, and alignments.")]),e._v(" "),a("h3",{attrs:{id:"level"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#level"}},[e._v("#")]),e._v(" Level")]),e._v(" "),a("p",[e._v("The level object assigns performance levels to an identified competency. Each level should have performance criteria (also called assessment or evaluation criteria). The “scale” is assumed to be discrete and qualitative (e.g. {1,2,3,4}, {beginner, intermediate, advanced}).")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("TIP")]),e._v(" "),a("p",[e._v("Levels are a common property of competencies. However, there are two different types of “levels” that are often confused: Performance levels of the same skill or ability (or indications of knowledge) and levels of advancement in rank or the ability to perform a job. In the latter case, advanced levels of a competency usually requires additional and different skills than lower levels: A black belt karate master can do things that a white belt cannot, and advancement from a junior to intermediate to senior programmer involves performing new tasks, not just writing the same type of code better or more efficiently.")])]),e._v(" "),a("p",[e._v("When defining competencies and frameworks for human interpretation, these two types of levels can be conflated without causing too much harm, but treating levels of advancement as levels of performance leads to computational problems when trying to make inferences about sub-competencies. As a result, it is best practice to treat different levels of advancement as distinct competencies rather than to relate them with the Performance Level object. Future versions of CaSS will use the relation “is a level of” and “is a more advanced level of” to indicate the connection, which will also allow categorical competencies such as “karate” to be defined in addition to their levels.")]),e._v(" "),a("h3",{attrs:{id:"relation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#relation"}},[e._v("#")]),e._v(" Relation")]),e._v(" "),a("p",[e._v("Relations are statements that relate two competencies (in the same or different frameworks). The standard relationships in the current release of CaSS include “requires,” “is required by,” “narrows,” “broadens,” “is the same as,” and “is equivalent to.”")]),e._v(" "),a("p",[e._v("Relations that describe how competencies are related could be represented as properties on the competencies, however, several use cases include third parties creating new relationships between competencies. These third-party relationships can be crosswalks, alignments, or other mappings between frameworks. As the third party owns these relationships, they may compose a separate framework owned by the third party.")]),e._v(" "),a("h3",{attrs:{id:"alignment"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#alignment"}},[e._v("#")]),e._v(" Alignment")]),e._v(" "),a("p",[e._v("CaSS uses the "),a("a",{attrs:{href:"http://www.lrmi.net/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Learning Resource Metadata Initiative (LRMI)"),a("OutboundLink")],1),e._v(" "),a("a",{attrs:{href:"https://schema.org/AlignmentObject",target:"_blank",rel:"noopener noreferrer"}},[e._v("alignment object"),a("OutboundLink")],1),e._v(" to indicate alignments between resources and competencies. These are expressed using the "),a("a",{attrs:{href:"https://schema.org/CreativeWork",target:"_blank",rel:"noopener noreferrer"}},[e._v("CreativeWork"),a("OutboundLink")],1),e._v(" schema.")]),e._v(" "),a("h3",{attrs:{id:"assertion"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#assertion"}},[e._v("#")]),e._v(" Assertion")]),e._v(" "),a("p",[e._v("An assertion object records that an agent has asserted that a subject (i.e. an individual) holds or does not hold a particular competency at a particular performance level. The assertion can include:")]),e._v(" "),a("ul",[a("li",[e._v("(links to) associated evidence on which the assertion is based (e.g. an exam, a certificate, or a document)")]),e._v(" "),a("li",[e._v("a timestamp (when it was made)")]),e._v(" "),a("li",[e._v("an expiration time past which it is no longer to be considered valid")]),e._v(" "),a("li",[e._v("a confidence "),a("em",[e._v("p")]),e._v(" with 0 ≤ "),a("em",[e._v("p")]),e._v(" ≤ 1")])]),e._v(" "),a("p",[e._v("Some applications may interpret confidence as the agent’s estimate of the probability that an assertion is correct, but other applications may take a more circumspect view and interpret it as nothing more than a general indicator of confidence in the assertion.")]),e._v(" "),a("h2",{attrs:{id:"cass-components"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cass-components"}},[e._v("#")]),e._v(" CaSS Components")]),e._v(" "),a("p",[e._v("Each CaSS instance contains the following components:")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("CaSS Repository")]),e._v(" - installed on one or more servers\n"),a("ul",[a("li",[e._v("Services for storing, retrieving, and updating CaSS objects (competencies, frameworks, alignments, roll-up rules, assertions, etc.)")]),e._v(" "),a("li",[e._v("Identity management services")]),e._v(" "),a("li",[e._v("Security framework")]),e._v(" "),a("li",[e._v("Adapters")])])]),e._v(" "),a("li",[a("strong",[e._v("CaSS Libraries")]),e._v(" - JavaScript libraries that implement the majority of CaSS functionality. These are incorporated into Web applications or other applications that use CaSS.\n"),a("ul",[a("li",[e._v("Import/Export (Import and export competencies and frameworks)")]),e._v(" "),a("li",[e._v("Identity Manager (JavaScript methods for the CaSS Identity manager)")]),e._v(" "),a("li",[e._v("Object Instantiation (JavaScript versions of CaSS objects)")]),e._v(" "),a("li",[e._v("Repository library (JavaScript methods for repository APIs)")]),e._v(" "),a("li",[e._v("Admin tools (Used to configure permissions, adapters, settings, etc.)")]),e._v(" "),a("li",[e._v("Plugins (JavaScript CaSS adapters used to communicate with external applications)")])])]),e._v(" "),a("li",[a("strong",[e._v("CaSS Applications")]),e._v(" - HTML5 web applications that provide software capabilities. Can be run as a standalone Web application or incorporated into other Web applications.")])]),e._v(" "),a("p",[a("img",{attrs:{src:"/cass_overview_components.png",alt:"CaSS Components"}})]),e._v(" "),a("h3",{attrs:{id:"cass-reference-implementation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cass-reference-implementation"}},[e._v("#")]),e._v(" CaSS Reference Implementation")]),e._v(" "),a("p",[e._v("The CaSS Reference Implementation refers to an instance of CaSS maintained by the CaSS project to demonstrate CaSS services in action and to provide sample code to developers. The CaSS Reference Implementation includes end-user applications that are meant to demonstrate CaSS but are not meant to be production applications. The code for the CaSS Reference Implementation is available from "),a("a",{attrs:{href:"https://github.com/cassproject/CaSS",target:"_blank",rel:"noopener noreferrer"}},[e._v("GitHub"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("h3",{attrs:{id:"cass-adapters"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cass-adapters"}},[e._v("#")]),e._v(" CaSS Adapters")]),e._v(" "),a("p",[e._v("A CaSS Adapter is software that translates information and requests from an external system into the format required by CaSS APIs and vice versa. CaSS Adapters can be built into external systems or be implemented as middleware that sits between an external system and a CaSS instance.  CaSS Adapters are used by a CaSS instance to retrieve assertions about an individual’s competencies from external systems. CaSS Adapters may also be used by external systems to query CaSS about individual competencies and to receive answers to such queries in their preferred format.")]),e._v(" "),a("p",[a("RouterLink",{attrs:{to:"/guide/interoperability/#adapters-overview"}},[e._v("Several CaSS adapters")]),e._v(" come with the CaSS code distribution, including an xAPI adapter for retrieving "),a("a",{attrs:{href:"https://github.com/adlnet/xAPI-Spec/blob/master/xAPI.md",target:"_blank",rel:"noopener noreferrer"}},[e._v("xAPI statements"),a("OutboundLink")],1),e._v(" from a Learning Record Store (LRS). Other adapters relevant to the "),a("a",{attrs:{href:"https://adlnet.gov/projects/tla/",target:"_blank",rel:"noopener noreferrer"}},[e._v("ADL’s Total Learning Architecture (TLA)"),a("OutboundLink")],1),e._v(" are incorporated.")],1),e._v(" "),a("h3",{attrs:{id:"assertion-processors"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#assertion-processors"}},[e._v("#")]),e._v(" Assertion Processors")]),e._v(" "),a("p",[e._v("An Assertion Processor is a component of CaSS that, when asked whether an individual "),a("em",[e._v("X")]),e._v(" has competency "),a("em",[e._v("C")]),e._v(" (at performance level "),a("em",[e._v("L")]),e._v("), retrieves relevant assertions, collates them (using roll-up rules and the structure of the framework containing "),a("em",[e._v("C")]),e._v(", and returns a conclusion (assuming it is authorized to do so.) An assertion includes the identity of the individual (or "),a("strong",[e._v("subject")]),e._v(") and the competency. It can also include the identity of the agent making the assertion, a performance level, a link to evidence, a "),a("strong",[e._v("confidence")]),e._v(" (a number between 0 and 1), a timestamp, and an expiration time.")]),e._v(" "),a("p",[a("img",{attrs:{src:"/cass_overview_assertion_format.png",alt:"CaSS Assertion Format"}})]),e._v(" "),a("p",[e._v("Assertion processors maintain a configurable list of systems that can provide them with assertions. This list could consist of only one CaSS instance, in which case that instance acts as a store for competency-based learner profiles, but it can also include other systems that might make or transmit assertions. When an assertion processor receives a query, it looks at what other competencies might be related to the queried competency through roll-up rules and framework relationships, and the processor retrieves information about these as well as about the target competency. The processor then follows an algorithm that computes a single conclusion about the target competency (and target performance level, if relevant) taking into consideration roll-up rules, relationships, confidence, and (in some cases) the reliability of collaborating systems.")]),e._v(" "),a("p",[e._v("The current CaSS distribution includes a JavaScript Assertion Processor. This enables assertion processing to be done within client applications. Server-side versions may be implemented as part of an adapter or Node application. Future plans include a server-side version that will act as an adapter for the TLA’s profile API.")]),e._v(" "),a("h2",{attrs:{id:"security-and-privacy"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#security-and-privacy"}},[e._v("#")]),e._v(" Security and Privacy")]),e._v(" "),a("p",[e._v("Security and privacy are strongly enforced in CaSS. The CaSS project has developed a "),a("a",{attrs:{href:"/dev/security/kbac-specification"}},[e._v("security framework")]),e._v(" that uses “Key-based Access Control” (KBAC) based on cryptographic methods found in Public Key Infrastructure (PKI). This approach was guided by the following requirements:")]),e._v(" "),a("ul",[a("li",[e._v("Prevent sensitive information (which in CaSS includes "),a("a",{attrs:{href:"https://en.wikipedia.org/wiki/Personal_data",target:"_blank",rel:"noopener noreferrer"}},[e._v("personally identifiable information (PII)"),a("OutboundLink")],1),e._v(") and competency assertions) from being discovered or read by any unauthorized individual.")]),e._v(" "),a("li",[e._v("Enable access to information to be controlled by its “owner.” The owner of an assertion about an individual’s competencies may be the individual, but it may also be the individual’s employer or another type of entity. Note that controlling access is not the same as controlling the contents of an assertion, which an owner cannot typically change.")]),e._v(" "),a("li",[e._v("Enable recipients of sensitive information to verify that it is valid and that no unauthorized tampering or alteration has occurred.")]),e._v(" "),a("li",[e._v("Enable a wide variety of privacy policies to be implemented, ranging from open policies with no privacy or data protection to highly secure policies that, for example, prevent CaSS from reporting whether or not any assertion exists about an individual unless the requesting system is on a trusted list and securely authenticates itself.")]),e._v(" "),a("li",[e._v("Protect privacy while supporting the use of anonymized “open data” for the purpose of analyzing and improving learning and training systems and for other research purposes.")])]),e._v(" "),a("h3",{attrs:{id:"cass-security-framework"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cass-security-framework"}},[e._v("#")]),e._v(" CaSS Security Framework")]),e._v(" "),a("p",[e._v("The CaSS security framework assigns an identity to each person, organization, software system, or group. Identities are stored in the CaSS identity manager as 2048 bit "),a("a",{attrs:{href:"https://en.wikipedia.org/wiki/RSA_(cryptosystem)",target:"_blank",rel:"noopener noreferrer"}},[e._v("public RSA keys"),a("OutboundLink")],1),e._v(". In CaSS implementations, these are mapped externally to meaningful identifiers, but within CaSS, and when included in a CaSS object such as an assertion about someone’s competency, they are just 2048 bit pseudo-identifiers that contain no PII and require additional mappings to refer to individuals.")]),e._v(" "),a("p",[e._v("CaSS objects are JSON-LD objects that can be stored open to the public (unencrypted) or privately (encrypted) in the CaSS repository. Objects can be transmitted to other systems as plain text if desired, but by default objects in transit are encrypted and contain additional signatures that can be used to verify that they have not been altered and that specify which identities have the following permissions:")]),e._v(" "),a("ul",[a("li",[a("strong",[e._v("Read")]),e._v(": Decrypt and read the object")]),e._v(" "),a("li",[a("strong",[e._v("Edit")]),e._v(": Read, change, and re-publish the object or specified properties of the object")]),e._v(" "),a("li",[a("strong",[e._v("Delete")]),e._v(": Delete an object (only applies to the CaSS Repository)")]),e._v(" "),a("li",[a("strong",[e._v("Control")]),e._v(": Grant and revoke permissions")])]),e._v(" "),a("p",[e._v("CaSS uses public/private key encryption and signature methods to ensure that only those identities assigned the above permissions can perform the corresponding tasks. For example, if someone with the right to read an object but not the right to edit it nonetheless opens it, edits it, and re-saves it, then the unpermitted tampering will be immediately detected by any CaSS instance or any system using secure versions of the CaSS APIs and can be detected using standard means by any third party.")]),e._v(" "),a("p",[e._v("In CaSS, identities, and hence the above permissions, can be assigned to groups as well as individuals. CaSS assumes that group membership can be verified externally to CaSS. Identities can also be assigned to systems, such as an LMS or an HR system.")]),e._v(" "),a("h3",{attrs:{id:"roles-in-cass-applications"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#roles-in-cass-applications"}},[e._v("#")]),e._v(" Roles in CaSS Applications")]),e._v(" "),a("p",[e._v("CaSS itself only supports permissions, and only does this on an object-by-object basis. Roles and associated policies are defined in applications that use CaSS services. It is up to these applications to assign appropriate permissions to CaSS objects. Once assigned, however, any CaSS instance will enforce these permissions and unauthorized actions will be either prevented (read actions) or revealed (other actions).")]),e._v(" "),a("p",[a("img",{attrs:{src:"/cass_overview_roles.png",alt:"CaSS Roles"}})]),e._v(" "),a("h3",{attrs:{id:"analysis-of-kbac-security"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#analysis-of-kbac-security"}},[e._v("#")]),e._v(" Analysis of KBAC Security")]),e._v(" "),a("p",[e._v("The effectiveness of KBAC Security is analyzed in a "),a("a",{attrs:{href:"/dev/security/kbac-threat-model"}},[e._v("Threat Model")]),e._v(" document. The document shows how KBAC prevents common threats and the impact should systems become compromised.")]),e._v(" "),a("p",[e._v("Implementers, users, and administrator should note that KBAC will not prevent attacks based on compromising end user applications, e.g. attacks that steal information from an end-user’s browser after it has been decrypted and displayed, attacks that compromise a server that provides an end-user application, or attacks that steal a user’s password from a web browser. These attacks are also analyzed in the Threat Model under the “Client-side Attacks” tab.")])])}),[],!1,null,null,null);t.default=r.exports}}]);