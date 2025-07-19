'use strict';
'require view';
'require form';

return view.extend({
    render: function() {
        var m, s, o;

        m = new form.Map('ser2net', 'ser2net');

        s = m.section(form.TypedSection, "proxy", _("Proxies"));
        s.anonymous = true;
        s.addremove = true;

        o = s.option(form.Flag, "enabled", _("Enabled"));
        o.rmempty = false;

        o = s.option(form.Value, "port", _("Service port"), _("The TCP/UDP port to listen on."));
        o.rmempty = false;
        o.datatype = "port";
        o.default = 5000;

        // 修改协议选项，添加UDP支持
        o = s.option(form.ListValue, "protocol", _("Protocol"), _("The protocol to listen to."));
        o.rmempty = false;
        o.value("raw", _("Raw"));
        o.value("rawlp", _("Rawlp"));
        o.value("telnet", _("Telnet"));
        o.value("udp", _("UDP"));  // 新增UDP协议选项
        o.value("off", _("Off"));
        o.default = "raw";

        o = s.option(form.Value, "timeout", _("Timeout"), _("The amount of seconds of inactivity before a disconnect occurs.<br/>A value of zero means wait indefinitely."));
        o.rmempty = false;
        o.datatype = "uinteger";
        o.default = 0;

        o = s.option(form.Value, "device", _("Device"), _("The name of the device to connect to.<br/>This must be in the form of /dev/<device>."));
        o.rmempty = false;
        o.default = "/dev/ttyUSB0";

        o = s.option(form.ListValue, "baudrate", _("Baud rate"), _("The speed the device port should operate at."));
        o.rmempty = false;
        o.value(300);
        o.value(1200);
        o.value(2400);
        o.value(4800);
        o.value(9600);
        o.value(19200);
        o.value(38400);
        o.value(57600);
        o.value(115200);
        o.value(230400);
        o.value(460800);
        o.value(921600);
        o.default = 9600;

        o = s.option(form.ListValue, "databits", _("Data bits"));
        o.rmempty = false;
        o.value(8);
        o.value(7);
        o.default = 8;

        o = s.option(form.ListValue, "parity", _("Parity"));
        o.rmempty = false;
        o.value("none", _("None"));
        o.value("even", _("Even"));
        o.value("odd", _("Odd"));
        o.default = "none";

        o = s.option(form.ListValue, "stopbits", _("Stop bits"));
        o.rmempty = false;
        o.value(1);
        o.value(2);
        o.default = 1;

        // 新增UDP专用选项
        o = s.option(form.Value, "udp_bind", _("UDP Bind Address"), _("The IP address to bind UDP to (default: 0.0.0.0 for all interfaces)"));
        o.depends("protocol", "udp");
        o.default = "0.0.0.0";
        o.datatype = "ipaddr";

        o = s.option(form.Flag, "udp_broadcast", _("Allow UDP Broadcast"), _("Allow receiving broadcast packets"));
        o.depends("protocol", "udp");
        o.default = "0";

        o = s.option(form.Flag, "udp_reuseaddr", _("Reuse UDP Address"), _("Allow multiple applications to bind to the same UDP port"));
        o.depends("protocol", "udp");
        o.default = "1";

        // 原有选项
        s.option(form.Flag, "rtscts", _("Use RTS and CTS lines"));
        s.option(form.Flag, "local", _("Ignore modem control signals"));
        s.option(form.Flag, "remctl", _("Allow the RFC 2217 protocol"));
        s.option(form.DynamicList, "options", _("Extra options"));
        s.option(form.Value, "led_tx", _("TX LED configuration"));
        s.option(form.Value, "led_rx", _("RX LED configuration"));

        return m.render();
    }
});
