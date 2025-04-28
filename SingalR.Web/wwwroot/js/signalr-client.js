$(document).ready(function () {

    const connection = new signalR.HubConnectionBuilder().withUrl("/exampleTypeSafeHub").build();

    const broadcastMessageToAllClientHubMethodCall = "BroadcastMessageToAllClient";
    const receiveMessageForAllClientMethodCall = "ReceiveMessageForAllClient";

    const broadcastMessageToCallerClientHubMethodCall = "BroadcastMessageToCallerClient";
    const receiveMessageForCallerClientMethodCall = "ReceiveMessageForCallerClient";

    const broadcastMessageToOthersClientHubMethodCall = "BroadcastMessageToOthersClient";
    const receiveMessageForOthersClientMethodCall = "ReceiveMessageForOthersClient";

    const broadcastMessageToIndividualClientHubMethodCall = "BroadcastMessageToIndividualClient";
    const receiveMessageForIndividualClientMethodCall = "ReceiveMessageForIndividualClient";

    const receiveConnectedClientCountAllClient = "ReceiveConnectedClientCountAllClient";

    const receiveTypedMessageForAllClient = "ReceiveTypedMessageForAllClient";
    const BroadcastTypedMessageToAllClient = "BroadcastTypedMessageToAllClient";

    const groupA = "Group A"
    const groupB = "Group B"
    let currentGroupList = [];

    function refreshGroupList() {

        $("#groupList").empty();
        currentGroupList.forEach(x => {
            $("#groupList").append(`<p>${x}</p>`)
        })

    }

    $("#btn-groupA-add").click(function () {
        if (currentGroupList.includes(groupA)) return;
        connection.invoke("AddGroup", groupA).then(() => {
            currentGroupList.push(groupA);
            refreshGroupList();
        })
    })

    $("#btn-groupA-remove").click(function () {
        if (!currentGroupList.includes(groupA)) return;
        connection.invoke("RemoveGroup", groupA).then(() => {
            currentGroupList = currentGroupList.filter(x => x !== groupA)
            refreshGroupList();
        })
    })

    $("#btn-groupB-add").click(function () {
        if (currentGroupList.includes(groupB)) return;
        connection.invoke("AddGroup", groupB).then(() => {
            currentGroupList.push(groupB);
            refreshGroupList();
        })
    })

    $("#btn-groupB-remove").click(function () {
        if (!currentGroupList.includes(groupB)) return;
        connection.invoke("RemoveGroup", groupB).then(() => {
            currentGroupList = currentGroupList.filter(x => x !== groupB)
            refreshGroupList();
        })
    })

    $("#btn-groupA-send-message").click(function () {
        const message = "Grup A mesaj";
        connection.invoke("BroadcastMessageToGroupClients", groupA, message).catch(err => console.error("hata", err))
        console.log("Mesaj Gönderildi")
    })

    $("#btn-groupB-send-message").click(function () {
        const message = "Grup B mesaj";
        connection.invoke("BroadcastMessageToGroupClients", groupB, message).catch(err => console.error("hata", err))
        console.log("Mesaj Gönderildi")
    })

    connection.on("ReceiveMessageForGroupClients", (message) => {
        console.log("Gelen Mesaj", message);
    })


    function start() {
        connection.start().then(() => {
            console.log("Hub ile bağlantı kuruldu.");
            $("#connectionId").html(`Connection Id : ${connection.connectionId}`);
        });
    }

    try {
        start();
    }
    catch {
        setTimeout(() => start(), 5000)
    }

    const span_client_count = $("#span-connected-client-count");
    connection.on(receiveConnectedClientCountAllClient, (count) => {
        span_client_count.text(count);
        console.log("Connected client count", count);
    })


    connection.on(receiveMessageForAllClientMethodCall, (message) => {
        console.log("Gelen Mesaj", message);
    })

    connection.on(receiveTypedMessageForAllClient, (product) => {
        console.log("Gelen Ürün", product);
    })


    connection.on(receiveMessageForCallerClientMethodCall, (message) => {
        console.log("(Caller) Gelen Mesaj", message);
    })

    connection.on(receiveMessageForOthersClientMethodCall, (message) => {
        console.log("(Others) Gelen Mesaj", message);
    })

    connection.on(receiveMessageForIndividualClientMethodCall, (message) => {
        console.log("(Individual) Gelen Mesaj", message);
    })

    $("#btn-send-message-all-client").click(function () {

        const message = "Hello World";

        connection.invoke(broadcastMessageToAllClientHubMethodCall, message).catch(err => console.error("hata",err))

    })

    $("#btn-send-message-caller-client").click(function () {

        const message = "Hello World";

        connection.invoke(broadcastMessageToCallerClientHubMethodCall, message).catch(err => console.error("hata", err))

    })

    $("#btn-send-message-others-client").click(function () {

        const message = "Hello World";

        connection.invoke(broadcastMessageToOthersClientHubMethodCall, message).catch(err => console.error("hata", err))

    })

    $("#btn-send-message-individual-client").click(function () {

        const message = "Hello World";
        const connectionId = $("#text-connectionId").val();

        connection.invoke(broadcastMessageToIndividualClientHubMethodCall, connectionId, message).catch(err => console.error("hata", err))

    })

    $("#btn-send-typed-message-all-client").click(function () {
        const product = { id: 1, name: "pen 1", price: 200 };

        connection.invoke(BroadcastTypedMessageToAllClient, product).catch(err => console.error("hata", err))
        console.log("ürün gönderildi.")
    })
})