export const root = {
    primary: '#3e424b',
    secondary: '#d9dddc',
}
export const Styles = {
    // ====== Generic styles ====== //
    safeAreaView : { flex: 1, justifyContent: 'center', alignItems: 'center' },
    padding50: { padding:50 },
    padding30: { padding:30 },
    padding20: { padding:20 },
    padding10: { padding:10 },
    fontLarge: { fontSize:30 },
    fontMedium: { fontSize: 20 },
    fontSmall: { fontSize:12 },
    fontBold: { fontWeight: 'bold' },
    fontLight: { fontWeight: '200' },
    homeCard: {
        backgroundColor: root.secondary,
        padding:15,
        marginRight:10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    weatherCard_header: {
        backgroundColor: root.primary,
        padding: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    weatherCard_hourly: {
        backgroundColor: root.secondary,
        width: 150,
        padding:10,
        marginRight:10,
        borderRadius: 10,
        alignItems: 'center'
    },
    weatherCard_daily: {
        width: '100%',
        padding:10,
        marginBottom:10,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth:1,
        flexDirection:'row'
    }
}