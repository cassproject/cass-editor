<template>
    <div class="import-page">
        <aside class="menu is-info">
            <div class="menu-header">
                Supported File Types
            </div>
            <div
                class="menu-item"
                v-if="method=='file'">
                <h1>CaSS formatted CSV</h1>
                <h2>
                    For this import, you can use one or two CSVs.
                    The first (required) CSV describes the competencies to include in a new framework.
                    The second (optional) CSV describes the relations between the competencies found in the first framework.
                    <br>
                    Each row in the first CSV will represent one competency,
                    and each row in the second CSV will represent one relation between two competencies.
                    The relations can be between competencies found in the first CSV,
                    competencies found in other frameworks, or a mixture of the two.
                    <br>
                    You can select the columns to use to describe the id, name, description, and other fields.
                </h2>
                <small class="right">Template <i class="fa fa-download" /></small>
                <small>Example <i class="fa fa-download" /></small>
            </div>
            <div
                class="menu-item"
                v-if="method=='file'">
                <h1>CTDL-ASN formatted CSV</h1>
                <h2>
                    For this import, you use one CSV.
                    Each row in the CSV will represent one object, whether that be a competency, or a competency framework.
                    Particular fields will be used to determine hierarchy.
                    <br>
                    Using this format, you can import several frameworks, each with their own competencies.
                    Competencies may not be shared across frameworks, and each competency may only have one parent.
                    <br>
                    It is also important that the rows be sequenced correctly,
                    with competency frameworks appearing before the competencies inside of them,
                    and for a parent to be in a row above a child of that parent.
                    <br>
                    Any field with multiple values must be formatted as entry 1|entry 2.
                </h2>
                <small class="right">Template <i class="fa fa-download" /></small>
                <small>Example <i class="fa fa-download" /></small>
            </div>
            <div
                class="menu-item"
                v-if="method=='file'">
                <h1>Medbiquitous XML</h1>
                <h2>
                    Medbiquitous is a standards body that includes medical competencies as one of their XML based formats.
                    <br>
                    Using this format, you can import competencies exported from a system that exports Medbiquitous formatted XML.
                </h2>
                <small>Example <i class="fa fa-download" /></small>
            </div>
            <div
                class="menu-item"
                v-if="method=='file'">
                <h1>Achievement Standards Network RDF+JSON</h1>
                <h2>
                    The Achievement Standards Network set of standards, or ASN standard for short,
                    is a legacy standard used primarily by achievementstandards.org to transmit
                    state standards and other national and organizational standards.
                    <br>
                    Using this format,
                    you can import competencies exported from achievementstandards.org and other systems in an RDF JSON format.
                </h2>
                <small class="right">Template <i class="fa fa-download" /></small>
                <small>Example <i class="fa fa-download" /></small>
            </div>
            <div
                class="menu-item"
                v-if="method=='file'">
                <h1>CTDL-ASN formatted JSON-LD</h1>
                <h2>
                    For this import, you use one JSON-LD file that includes a graph of the framework and all of its competencies.
                    <br>
                    Using this format, you can import a framework and competencies from a system that exports CTDL-ASN formatted JSON-LD.
                </h2>
                <small class="right">Template <i class="fa fa-download" /></small>
                <small>Example <i class="fa fa-download" /></small>
            </div>
            <div
                class="menu-item"
                v-if="method=='server'">
                <h1>CaSS Server</h1>
                <h2>
                    If you know the URL of a CaSS Repository,
                    you can import frameworks from that repository.
                    <br>
                    This import maintains the URLs of the Competency Frameworks and does not change any of the data.
                    <br>
                    After entering the endpoint below, you can select which frameworks you would like to import.
                </h2>
                <small>Example <i class="fa fa-link" /></small>
            </div>
            <div
                class="menu-item"
                v-if="method=='server'">
                <h1>IMS CASE Server</h1>
                <h2>
                    If you know the URL of a IMS CASE Repository, such as OpenSalt,
                    you can import published frameworks from that repository.
                    <br>
                    This import maintains the URLs of the CASE frameworks and changes both the format
                    and schema used to store the CASE frameworks in CaSS, but does not change any of the data.
                    <br>
                    After entering the endpoint below, you can select which frameworks you would like to import.
                </h2>
                <small>Example <i class="fa fa-link" /></small>
            </div>
        </aside>
        <div class="main">
            <div class="task-controls section">
                <div class="tabs is-small is-boxed">
                    <ul>
                        <li :class="{ 'is-active': method === 'file'}">
                            <a @click="method = 'file'">
                                <span class="icon is-small"><i
                                    class="fas fa-file"
                                    aria-hidden="true" /></span>
                                <span>File Import</span>
                            </a>
                        </li>
                        <li :class="{ 'is-active': method === 'server'}">
                            <a @click="method = 'server'">
                                <span class="icon is-small">
                                    <i
                                        class="fa fa-server"
                                        aria-hidden="true" />
                                </span>
                                <span>Remote Server</span>
                            </a>
                        </li>
                        <li :class="{ 'is-active': method === 'text'}">
                            <a @click="method = 'text'">
                                <span class="icon is-small">
                                    <i
                                        class="fas fa-paste"
                                        aria-hidden="true" />
                                </span>
                                <span>Paste Text</span>
                            </a>
                        </li>
                        <li :class="{ 'is-active': method === 'url'}">
                            <a @click="method = 'url'">
                                <span class="icon is-small">
                                    <i
                                        class="fas fa-link"
                                        aria-hidden="true" />
                                </span>
                                <span>URL</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div
                class="section section-file"
                v-if="method=='file'">
                <center><h1>Drop file or click to select.</h1></center>
                <input type="file">
                <button @click="importFromFile">
                    Import
                </button>
            </div>
            <div
                class="section section-server"
                v-if="method=='server'">
                <center>
                    <h1>Paste URL endpoint of server</h1>
                    <input type="url">
                </center>
            </div>
            <div
                class="section section-text"
                v-if="method=='text'">
                <textarea />
            </div>
            <div
                class="section section-url"
                v-if="method=='url'">
                <input type="url">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Import",
    data: function() {
        return {
            method: "file"
        };
    },
    methods:
    {
        importFromFile: function() {

        }
    }
};
</script>

<style lang="scss">
.import-page{
    .menu-item{
        display:block;
        border-radius: 1rem;
        margin-top:1rem;
        margin-right:1rem;
        padding:.25rem;
        padding-left:1rem;
        small{
            display:block;
        }
    }
    .menu-header{
        display:block;
        font-size:x-large;
        margin-top:1rem;
        margin-right:1rem;
        padding:.25rem;
        padding-left:1rem;
    }
    aside{
        width:405px;
        float:left;
        height:calc(100vh - 60px);
        h1{
            font-weight:bold;
            font-size:1.05rem;
        }
        h2{
            font-size:.8rem;
            text-align: justify;
            text-justify: inter-word;
            br{
                margin: 10px;
                display:block;
                content: " ";
            }
        }
        small{
            font-weight:bold;
            font-size:.8rem;
        }
        overflow-y:scroll;
    }
    .main{
        margin-left:420px;
        }
    .right{float:right;}
    .section{
        h1{
            font-size:x-large;
        }
    }
    .section-file{
        input{
            width:100%;
            display:block;
            border:1px dashed black;
            border-radius:1rem;
            padding:100px;
            padding-left:calc(50% - 100px);
        }
    }
    .section-server{
        input{
            width:30rem;
        }
    }
}
</style>